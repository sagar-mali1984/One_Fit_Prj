import { Component, Input, Output, EventEmitter } from '@angular/core';
import { CRMEnquiryService } from '../../CRMEnquiry.service';
import { Contact } from '../../Classes/Contact';
import { ContactPeople } from '../../Classes/ContactPeople';
import * as $ from 'jquery';
import { GlobalService } from '../../../GlobalService/global.service';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
    selector: 'crm-enquiry-people',
    templateUrl: './People.component.html'
})

export class PeopleComponent {

    @Input() IsDisplay;
    @Input() ContactId;
    // @Output() notifyToCRMEnquiry = new EventEmitter();
    @Output() notifyToDetails = new EventEmitter();
    objContact: Contact = new Contact();
    objContactPeople: ContactPeople = new ContactPeople();
    listContactPeople: ContactPeople[] = [];

    constructor(private service: CRMEnquiryService, private gs: GlobalService, private router: Router) { }

    ngOnChanges() {
        if (this.gs.checkToken()) {
            this.service.loadContact(this.ContactId)
                .subscribe(data => {
                    this.objContact = data;
                    this.service.listContactPeople(this.objContact.ContactRef)
                        .subscribe(data => {
                            this.listContactPeople = data;
                        });
                });
        }
    }

    onAddContactPeopleClick() {
        $(".lblMainMenu").text("Add Contact People");
        this.router.navigate(['homePage/addContactPeople'], { queryParams: { ContactRef: this.objContact.ContactRef, RecordID: 0 } });
    }

    onEditClick(recordId: number) {
        this.router.navigate(['homePage/addContactPeople'], { queryParams: { ContactRef: this.objContact.ContactRef, RecordID: recordId } });
    }

    onDeleteClick(recordId: number) {
        if (confirm("Are you sure you want to delete?")) {

            if (this.gs.checkToken()) {
                this.service.deleteContactPeople(recordId)
                    .subscribe(data => {
                        this.service.listContactPeople(this.objContact.ContactRef)
                            .subscribe(data => {
                                this.listContactPeople = data;
                            });
                    });
            }
        }
    }

    onViewMorePeopleClick() {
        // debugger;
        this.notifyToDetails.emit('ViewMorePeople');

    }

    onQuickEditClick(recordId: number) {
        $("#txtForename" + recordId).removeClass("display-none");
        $("#lblForename" + recordId).addClass("display-none");
        $("#txtSurname" + recordId).removeClass("display-none");
        $("#lblSurname" + recordId).addClass("display-none");
        $("#txtEmail" + recordId).removeClass("display-none");
        $("#spnEmail" + recordId).addClass("display-none");
        $("#aEmail" + recordId).addClass("display-none");
        // $("#btnQuickSave" + recordId).removeClass("display-none");
        // $("#btnQuickEdit" + recordId).addClass("display-none");

    }

    onQuickSaveClick(recordId: number) {
        //debugger;
        if (this.gs.checkToken()) {
            this.service.loadContactPeople(recordId)
                .subscribe(data => {
                    // debugger;
                    this.objContactPeople = data;
                    this.objContactPeople.Forename = $("#txtForename" + recordId).val();
                    this.objContactPeople.Surname = $("#txtSurname" + recordId).val();
                    this.objContactPeople.Email = $("#txtEmail" + recordId).val();
                    this.service.saveContactPeople(this.objContactPeople)
                        .subscribe(data => {
                            // debugger;
                            this.onQuickCancelClick(recordId);
                            // $("#txtForename" + recordId).addClass("display-none");
                            // $("#lblForename" + recordId).removeClass("display-none");
                            // $("#txtSurname" + recordId).addClass("display-none");
                            // $("#lblSurname" + recordId).removeClass("display-none");
                            // $("#txtEmail" + recordId).addClass("display-none");
                            // $("#spnEmail" + recordId).removeClass("display-none");
                            // $("#aEmail" + recordId).removeClass("display-none");
                            // // $("#btnQuickSave" + recordId).addClass("display-none");
                            // // $("#btnQuickEdit" + recordId).removeClass("display-none");

                            // $("#ddlActions" + recordId).removeClass("display-none");
                            // $("#btnSave" + recordId).addClass("display-none");
                            // $("#btnCacel" + recordId).addClass("display-none");

                        });
                });




        }



    }

    onActionChange(value: string, recordId: number) {
        //debugger;
        if (value === "QuickEdit") {
            $("#button-basic-action" + recordId).addClass("display-none");
            $("#btnSave" + recordId).removeClass("display-none");
            $("#btnCacel" + recordId).removeClass("display-none");

            this.onQuickEditClick(recordId);
        }
        else if (value === "Edit") {
            this.onEditClick(recordId);
        }
        else if (value == "Delete") {
            this.onDeleteClick(recordId);
        }
        $("#button-basic-action" + recordId).val("0");
    }




    onQuickCancelClick(recordId: number) {
        $("#button-basic-action" + recordId).removeClass("display-none");
        $("#btnSave" + recordId).addClass("display-none");
        $("#btnCacel" + recordId).addClass("display-none");

        $("#txtForename" + recordId).addClass("display-none");
        $("#lblForename" + recordId).removeClass("display-none");
        $("#txtSurname" + recordId).addClass("display-none");
        $("#lblSurname" + recordId).removeClass("display-none");
        $("#txtEmail" + recordId).addClass("display-none");
        $("#spnEmail" + recordId).removeClass("display-none");
        $("#aEmail" + recordId).removeClass("display-none");
    }
}