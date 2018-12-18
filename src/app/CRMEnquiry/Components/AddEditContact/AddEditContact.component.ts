import { Component, Input, Output, EventEmitter } from '@angular/core';
import { CRMEnquiryService } from '../../CRMEnquiry.service';
import { Contact } from '../../Classes/Contact';
import * as $ from 'jquery';
import { GlobalService } from '../../../GlobalService/global.service';
import { ActivatedRoute, Router } from '@angular/router';


@Component({
    selector: 'crm-enquiry-add-edit-contact',
    templateUrl: './AddEditContact.component.html'
})

export class AddEditContactComponent {

    objContact: Contact = new Contact();
    private sub: any;
    @Output() notifyAboutEditContact = new EventEmitter();
    @Input() ContactId;

    constructor(private service: CRMEnquiryService, private gs: GlobalService, private route: ActivatedRoute, private router: Router) {
    }

    ngOnInit() {
        // debugger;
        this.sub = this.route
            .queryParams
            .subscribe(params => {
                //  debugger;
                this.objContact.ContactID = + params['ContactID'];
                if (this.gs.checkToken()) {
                    if (this.objContact.ContactID != 0) {
                        $("#lblAddContact").text("Edit Contact");
                        // this.service.loadContact(this.objContact.ContactID)
                        //     .subscribe(data => {
                        //         this.objContact = data;
                        //     });

                    }
                }

            });
    }

    ngOnChanges() {
        //debugger;
        if (this.gs.checkToken()) {
            if (this.ContactId != 0) {
                $("#lblAddContact").text("Edit Contact");
                this.service.loadContact(this.ContactId)
                    .subscribe(data => {
                        this.objContact = data;
                    });

            }
        }
    }
    onSaveClick() {
        //  debugger;
        if (this.Validation()) {
            if (this.gs.checkToken()) {
                this.service.saveContact(this.objContact)
                    .subscribe(data => {
                        //  debugger;
                        this.objContact = data;
                        this.notifyAboutEditContact.emit('closePopupAfterSave');
                        this.router.navigate(['homePage/CRMEnquiry'], { queryParams: { ContactID: this.objContact.ContactID } });
                    });
            }
        }
    }

    onCancelClick() {
        let result = confirm("This action will loose any changes you have made.");
        if (result == true) {
            this.notifyAboutEditContact.emit('closePopupAfterCancel');
            $(".lblMainMenu").text("CRM Enquiry");
            this.router.navigate(['homePage/CRMEnquiry'], { queryParams: { ContactID: this.objContact.ContactID } });

        }


    }

    Validation() {
        if (this.objContact.ContactRef == "" || this.objContact.ContactRef == null) {
            alert("Please enter ContactRef");
            $("#txtContactRef").focus();
            return false;
        }
        else if (this.objContact.Company == "" || this.objContact.Company == null) {
            alert("Please enter Company Name");
            $("#txtCompanyName").focus();
            return false;
        }
        else if (this.objContact.Address1 == "" || this.objContact.Address1 == null) {
            alert("Please enter Address1");
            $("#txtAddress1").focus();
            return false;
        }
        else if (this.objContact.Town == "" || this.objContact.Town == null) {
            alert("Please enter Town");
            $("#txtTown").focus();
            return false;
        }
        else if (this.objContact.County == "" || this.objContact.County == null) {
            alert("Please enter County");
            $("#txtCounty").focus();
            return false;
        }
        else if (this.objContact.PostCode == "" || this.objContact.PostCode == null) {
            alert("Please enter PostCode");
            $("#txtPostCode").focus();
            return false;
        }
        else if (this.objContact.Tel == "" || this.objContact.Tel == null) {
            alert("Please enter Telephone");
            $("#txtTel").focus();
            return false;
        }
        else
            return true;
    }

}