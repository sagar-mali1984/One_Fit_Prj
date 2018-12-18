import { Component, Output, Input, EventEmitter } from '@angular/core';
import { CRMEnquiryService } from '../../../CRMEnquiry.service';
import { Contact } from '../../../Classes/Contact';
import * as $ from 'jquery';
import { ActivatedRoute, Router } from '@angular/router';
import { GlobalService } from '../../../../GlobalService/global.service';
//import { Select2OptionData } from 'ng2-select2';

@Component({
    selector: 'crm-enquiry-details1',
    templateUrl: './CRMEnquiryDetails.component.html'
})

export class CRMEnquiryDetailsComponent {

     ContactRef: string;
     //ContactID: number;
    // RecordID: number;
     listContacts: Contact[] = [];
     selectedContact: number = 0;
    //isOtherOptions: boolean = true;
    //public exampleData: Array<Select2OptionData>;
    private sub: any;

    constructor(private service: CRMEnquiryService, private router: Router, private route: ActivatedRoute, private gs: GlobalService) {
    }

    ngOnInit() {
       // debugger;
        // this.exampleData = [
        //     {
        //         id: 'basic1',
        //         text: 'Basic 1'
        //     },
        //     {
        //         id: 'basic2',
        //         disabled: true,
        //         text: 'Basic 2'
        //     },
        //     {
        //         id: 'basic3',
        //         text: 'Basic 3'
        //     },
        //     {
        //         id: 'basic4',
        //         text: 'Basic 4'
        //     }

        // ];
        if (this.gs.checkToken()) {
            // this.service.listContacts(null)             //To Populate ddlSelectCompany dropdown
            //     .subscribe(data => {
            //         debugger;
            //         this.listContacts = data;

                    this.sub = this.route
                        .queryParams
                        .subscribe(params => {
                           // debugger;
                            if (params['ContactID'] != undefined) {
                                this.selectedContact = +params['ContactID'];
                                // if (this.gs.checkToken()) {
                                //     if (this.ContactID != 0) {
                                //         this.onChange(this.ContactID);
                                //     }
                                // }
                            }
                            if (params['ContactRef'] != undefined) {
                              //  debugger;
                                this.ContactRef = params['ContactRef'];

                                if (this.ContactRef != '') {
                                  //  debugger;
                                    let Contact = this.listContacts.filter(x => x.ContactRef == this.ContactRef);
                                    this.onChange(Contact[0].ContactID)
                                    // this.selectedContact = Contact[0].ContactID;
                                    // $("#dvCRMDetails").removeClass('display-none');
                                    // $("#dvCancelButton").removeClass('display-none');
                                    // $("#dvOtherOptions").addClass('display-none');
                                   
                                }
                            }
                            if (params['Tab'] == 'people') {
                              //  debugger;
                                $("#tabCRMEnquiryPeople")[0].click();
                                setTimeout(function () {
                                    $("#tabCRMEnquiryPeople").click();
                                }, 1);
                            }


                        });
                // });
        }

    }

    onChange(value: number) {
       // debugger;
        this.selectedContact = value;
        //this.isOtherOptions = false;
        $("#dvCRMDetails").removeClass('display-none');
        $("#dvCancelButton").removeClass('display-none');
        $("#dvOtherOptions").addClass('display-none');

    }

    // onSearchDatabaseClick() {
    //     $(".lblMainMenu").text("CRM Enquiry");
    //     this.router.navigate(['homePage/search']);
    // }

    // onAddNewContactClick() {
    //     $(".lblMainMenu").text("Add New Contact");
    //     this.router.navigate(['homePage/addContact'], { queryParams: { ContactID: 0 } });
    // }

    // onCancelClick() {
    //     $(".lblMainMenu").text("Main Menu");
    //     this.router.navigate(['homePage/dashboard']);
    // }

    // onDetailNotify(message: any): void {
    //     if (message.Action === "ViewMorePeople") {     //On view more click of people table
    //         debugger;
    //         $("#tabCRMEnquiryPeople")[0].click();
    //         setTimeout(function () {
    //             $("#tabCRMEnquiryPeople").click();
    //         }, 1);
    //     }
    // }

}