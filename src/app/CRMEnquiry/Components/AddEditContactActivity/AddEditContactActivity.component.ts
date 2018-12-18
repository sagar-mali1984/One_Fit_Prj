import { Component, Input, Output, EventEmitter } from '@angular/core';
import { NgbDateStruct } from '@ng-bootstrap/ng-bootstrap';
import { CRMEnquiryService } from '../../CRMEnquiry.service';
import { ContactActivity } from '../../Classes/ContactActivity';
import * as $ from 'jquery';
import { GlobalService } from '../../../GlobalService/global.service';
import { ActivatedRoute, Router } from '@angular/router';
import * as moment from 'moment';

@Component({
    selector: 'crm-enquiry-add-edit-contact-activity',
    templateUrl: './AddEditContactActivity.component.html'
})

export class AddEditContactActivityComponent {

    ContactRef: string;
    private sub: any;
    listContactActivityTypes: any[] = [];
    listUsers: any[] = [];
    objContactActivity: ContactActivity = new ContactActivity();
    eventDate: NgbDateStruct;
    eventTime: any;

    constructor(private service: CRMEnquiryService, private gs: GlobalService, private route: ActivatedRoute, private router: Router) {
        let todayDatetime: Date = new Date();
        this.eventDate = { day: todayDatetime.getDate(), month: todayDatetime.getMonth() + 1, year: todayDatetime.getFullYear() };
        this.eventTime = { hour: todayDatetime.getHours(), minute: todayDatetime.getMinutes() };
        this.getContactActivityTypes();
        this.getUsers();
    }

    ngOnInit() {
        // debugger;
        this.sub = this.route
            .queryParams
            .subscribe(params => {
                this.ContactRef = params['ContactRef'];
            });
    }

    //to load data for rdType radio button
    getContactActivityTypes() {
        if (this.gs.checkToken()) {
            this.service.listContactActivityTypes()
                .subscribe(data => {
                    this.listContactActivityTypes = data;
                });
        }
    }

    //to load data for ddlAssignTo dropdown
    getUsers() {
        if (this.gs.checkToken()) {
            this.service.listUsers()
                .subscribe(data => {
                    this.listUsers = data;
                });
        }
    }

    onddlAssignToChange(val: string) {
        this.objContactActivity.UserID = val;
    }

    onTypeChange(val: string) {
        this.objContactActivity.LKPContactActivityTypeId = +val;
    }

    onSaveClick() {
        // debugger;
        if (this.Validation()) {
            // this.objContactActivity.EventDateAsString = new Date
            //     (this.eventDate.year
            //     , this.eventDate.month - 1
            //     , this.eventDate.day
            //     , this.eventTime.hour
            //     , this.eventTime.minute); //.toLocaleString();

            var dateTime = new Date
                (this.eventDate.year
                , this.eventDate.month - 1
                , this.eventDate.day
                , this.eventTime.hour
                , this.eventTime.minute);

            this.objContactActivity.EventDateAsString = moment(dateTime).format('LLLL');
            //alert(this.objContactActivity.EventDateAsString);
            this.objContactActivity.ContactRef = this.ContactRef;

            if (this.gs.checkToken()) {
                this.service.saveContactActivity(this.objContactActivity)
                    .subscribe(data => {
                        this.router.navigate(['homePage/CRMEnquiry'], { queryParams: { ContactRef: this.objContactActivity.ContactRef } });
                    });
            }
        }

    }

    onCancelClick() {
        // debugger;
        let result = confirm("This action will loose any changes you have made.");
        if (result == true) {
            $(".lblMainMenu").text("CRM Enqiry");
            this.router.navigate(['homePage/CRMEnquiry'], { queryParams: { ContactRef: this.ContactRef } });
        }
    }

    Validation() {
        // debugger;
        if (this.eventDate == null) {
            alert("Please select Date");
            $("#dpDateTime").focus();
            return false;
        }
        else if (this.eventTime == "" || this.eventTime == null) {
            alert("Please select Time");
            return false;
        }
        else if (this.objContactActivity.Description == "" || this.objContactActivity.Description == null) {
            alert("Please enter Description");
            $("#txtDescription").focus();
            return false;
        }
        else if ($("#ddlAssignTo").val() === "" || $("#ddlAssignTo").val() === "0") {
            alert("Please select Assign To");
            $("#ddlAssignTo").focus();
            return false;
        }
        else if ($("input[name='rdType']:checked").val() == null || $("input[name='rdType']:checked").val() == undefined) {
            alert("Please select Type");
            return false;
        }
        else
            return true;
    }

}