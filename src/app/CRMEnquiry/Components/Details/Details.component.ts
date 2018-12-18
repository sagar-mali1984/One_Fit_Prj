import { Component, Input, Output, EventEmitter } from '@angular/core';
import { CRMEnquiryService } from '../../CRMEnquiry.service';
import { Contact } from '../../Classes/Contact';
import { ContactActivity } from '../../Classes/ContactActivity';
import { ContactPeople } from '../../Classes/ContactPeople';
import { ActivatedRoute, Router } from '@angular/router';
import * as $ from 'jquery';
import { GlobalService } from '../../../GlobalService/global.service';
import { NgbModal, ModalDismissReasons, NgbModalRef } from '@ng-bootstrap/ng-bootstrap';
//import {AppRefresh} from '../../../app.component';


@Component({
    selector: 'crm-enquiry-details',
    templateUrl: './Details.component.html'
})

export class DetailsComponent {

    @Input() ContactId;
    @Output() notifyAboutDetail = new EventEmitter();
    @Output() notifyAboutEditContact = new EventEmitter();
    objContact: Contact = new Contact();
    listContactActivity: ContactActivity[] = [];
    listContactPeople: ContactPeople[] = [];
    selectedContact: number = 0;
    modalReference: NgbModalRef;
    private sub: any;

//constructor(private service: CRMEnquiryService,private ap : AppRefresh, private gs: GlobalService, private router: Router, private modalService: NgbModal, private route: ActivatedRoute) {
    constructor(private service: CRMEnquiryService, private gs: GlobalService, private router: Router, private modalService: NgbModal, private route: ActivatedRoute) {

    }

    ngOnInit() {
        // debugger;
        //this.ap.refreshDictionary("Contact");
        this.sub = this.route
            .queryParams
            .subscribe(params => {
                //  debugger;
                this.objContact.ContactID = + params['ContactID'];
                if (this.gs.checkToken()) {
                    if (this.objContact.ContactID != 0) {
                        $("#lblAddContact").text("Edit Contact");
                    }
                }

            });
        $(".lblMainMenu").text("Add New Contact");
    }

    ngOnChanges() {
        if (this.gs.checkToken()) {
            if(this.ContactId != "Select")
            {
                this.service.loadContact(this.ContactId)
                .subscribe(data => {
                    this.objContact = data;
                    this.service.listContactActivity(this.objContact.ContactRef)
                        .subscribe(data => {
                            this.listContactActivity = data;
                        });
                    this.selectedContact = this.objContact.ContactID;
                });
            }

            if (this.ContactId != 0) {
                $("#lblAddContact").text("Edit Contact");
                this.service.loadContact(this.ContactId)
                    .subscribe(data => {
                        this.objContact = data;
                    });

            }
            
        }
    }

    onAddActivityClick() {
        $(".lblMainMenu").text("Add New Activity");
        this.router.navigate(['homePage/addContactActivity'], { queryParams: { ContactRef: this.objContact.ContactRef } });
    }

    onEditAddressClick() {
        
        $( "#Changes" ).css("display", 'block');

        $('#TxtCompany').css('border', '3px solid black');
        $('#TxtCompany').prop('readonly', false);

        $('#TxtAddress').css('border', '3px solid black');
        $('#TxtAddress').prop('readonly', false);

        $('#TxtTown').css('border', '3px solid black');
        $('#TxtTown').prop('readonly', false);

        $('#TxtCounty').css('border', '3px solid black');
        $('#TxtCounty').prop('readonly', false);

        $('#TxtPostCode').css('border', '3px solid black');
        $('#TxtPostCode').prop('readonly', false);

        $('#TxtTel').css('border', '3px solid black');
        $('#TxtTel').prop('readonly', false);
        
    
    }

    onPeopleNotify(message: any) {
       
        if (message === "ViewMorePeople") {
            this.notifyAboutDetail.emit({ Action: 'ViewMorePeople', ContactRef: this.objContact.ContactRef });
        }
    }

    open(content) {
        
        $("#lblAddContact").text("Edit Contact");
        this.modalReference = this.modalService.open(content);
        this.modalReference.result.then((result) => {
            
        }, (reason) => {
            
        });
    }

    private getDismissReason(reason: any): string {
        if (reason === ModalDismissReasons.ESC) {
            return 'by pressing ESC';
        } else if (reason === ModalDismissReasons.BACKDROP_CLICK) {
            return 'by clicking on a backdrop';
        } else {
            return `with: ${reason}`;
        }
    }

    onEditContactNotify(message: any): void {
       
        if (message === "closePopupAfterSave") {
            this.modalReference.close();
            this.service.loadContact(this.ContactId)
                .subscribe(data => {
                    this.objContact = data;
                });
        }
        else if (message === "closePopupAfterCancel") {
            this.modalReference.close();
        }
    }

    onSaveClick() {
        
        if (this.Validation()) {
            if (this.gs.checkToken()) {
                this.service.saveContact(this.objContact)
                    .subscribe(data => {
                       
                        this.objContact = data;
                        this.notifyAboutEditContact.emit('closePopupAfterSave');
                        this.router.navigate(['homePage/CRMEnquiry'], { queryParams: { ContactID: this.objContact.ContactID } });
                    });
                    
                    $('#TxtCompany').css('border', '0px');
                    $('#TxtCompany').prop('readonly', true);
            
                    $('#TxtAddress').css('border', '0px');
                    $('#TxtAddress').prop('readonly', true);
            
                    $('#TxtTown').css('border', '0px');
                    $('#TxtTown').prop('readonly', true);
            
                    $('#TxtCounty').css('border', '0px');
                    $('#TxtCounty').prop('readonly', true);
            
                    $('#TxtPostCode').css('border', '0px');
                    $('#TxtPostCode').prop('readonly', true);
            
                    $('#TxtTel').css('border', '0px');
                    $('#TxtTel').prop('readonly', true);

                    $( "#Changes" ).css("display", 'none');
                    
            }
        }
    }

    onCancelClick() {
        let result = confirm("This action will loose any changes you have made.");
        if (this.gs.checkToken()) {
            this.service.saveContact(this.objContact)
                .subscribe(data => {
                    //  debugger;
                    this.objContact = data;
                    this.notifyAboutEditContact.emit('closePopupAfterSave');
                    this.router.navigate(['homePage/CRMEnquiry'], { queryParams: { ContactID: this.objContact.ContactID } });
                });
               
            $('#TxtCompany').css('border', '0px');
            $('#TxtCompany').prop('readonly', true);
    
            $('#TxtAddress').css('border', '0px');
            $('#TxtAddress').prop('readonly', true);
    
            $('#TxtTown').css('border', '0px');
            $('#TxtTown').prop('readonly', true);
    
            $('#TxtCounty').css('border', '0px');
            $('#TxtCounty').prop('readonly', true);
    
            $('#TxtPostCode').css('border', '0px');
            $('#TxtPostCode').prop('readonly', true);
    
            $('#TxtTel').css('border', '0px');
            $('#TxtTel').prop('readonly', true);

            $( "#Changes" ).css("display", 'none');
            
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