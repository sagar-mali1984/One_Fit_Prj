import { Component, Input, Output, EventEmitter } from '@angular/core';
import { CRMEnquiryService } from '../../CRMEnquiry.service';
import { ContactPeople } from '../../Classes/ContactPeople';
import * as $ from 'jquery';
import { GlobalService } from '../../../GlobalService/global.service';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
    selector: 'crm-enquiry-add-edit-contact-people',
    templateUrl: './AddEditContactPeople.component.html'
})

export class AddEditContactPeopleComponent {

    ContactRef: string;
    RecordID: number;
    private sub: any;
    objContactPeople: ContactPeople = new ContactPeople();
    isPrimaryContact: boolean = false;
    isDontEmail: boolean = false;

    constructor(private service: CRMEnquiryService, private gs: GlobalService, private route: ActivatedRoute, private router: Router) {
    }

    ngOnInit() {
        // debugger;
        this.sub = this.route
            .queryParams
            .subscribe(params => {
                //  debugger;
                this.ContactRef = params['ContactRef'];
                this.RecordID = parseInt(params['RecordID']);
                if (this.gs.checkToken()) {
                    if (this.RecordID != 0) {
                        $("#lblAddContactPeople").text("Edit Contact People");
                        this.service.loadContactPeople(this.RecordID)
                            .subscribe(data => {
                                this.objContactPeople = data;
                                this.isPrimaryContact = this.objContactPeople.PrimaryContact === 'True' ? true : false;
                                this.isDontEmail = this.objContactPeople.DontEmail === 'True' ? true : false;
                            });
                    }
                }
            });
    }

    onSaveClick() {
        if (this.Validation()) {
            this.objContactPeople.PrimaryContact = this.isPrimaryContact ? 'True' : 'False';
            this.objContactPeople.DontEmail = this.isDontEmail ? 'True' : 'False';
            this.objContactPeople.ContactRef = this.ContactRef;

            if (this.gs.checkToken()) {
                this.service.saveContactPeople(this.objContactPeople)
                    .subscribe(data => {
                        this.router.navigate(['homePage/CRMEnquiry'], { queryParams: { ContactRef: this.objContactPeople.ContactRef, Tab: 'people' } });
                    });
            }
        }

    }

    onCancelClick() {
        let result = confirm("This action will loose any changes you have made.");
        if (result == true) {
            $(".lblMainMenu").text("CRM Enquiry");
            this.router.navigate(['homePage/CRMEnquiry'], { queryParams: { ContactRef: this.ContactRef, Tab: 'people' } });
        }
    }

    Validation() {
        if (this.objContactPeople.Forename == "" || this.objContactPeople.Forename == null) {
            alert("Please enter Forename");
            $("#txtForename").focus();
            return false;
        }
        else if (this.objContactPeople.Surname == "" || this.objContactPeople.Surname == null) {
            alert("Please enter Surname Name");
            $("#txtSurname").focus();
            return false;
        }
        else
            return true;
    }



}