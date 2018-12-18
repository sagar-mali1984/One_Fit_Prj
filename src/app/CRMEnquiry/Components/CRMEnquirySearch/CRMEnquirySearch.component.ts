import { Component, Output, EventEmitter } from '@angular/core';
import { CRMEnquiryService } from '../../CRMEnquiry.service';
import { Contact } from '../../Classes/Contact';
import { GlobalService } from '../../../GlobalService/global.service';
import { ActivatedRoute, Router } from '@angular/router';
import * as $ from 'jquery';
import { Cookie } from 'ng2-cookies/ng2-cookies';

@Component({
    selector: 'crm-enquiry-search',
    templateUrl: './CRMEnquirySearch.component.html',
    styleUrls: ['./CRMEnquirySearch.component.css']
})

export class CRMEnquirySearchComponent {

    listContacts: Contact[] = [];
    objContact: Contact = new Contact();
    isClicked: boolean = true;
    divClass: string;

    constructor(private service: CRMEnquiryService, private gs: GlobalService, private router: Router) {
    }

    onSearchClick() {
        if (this.gs.checkToken()) {
            this.service.listContacts(this.objContact)
                .subscribe(data => {
                    this.listContacts = data;
                    $("#lblPageNo").removeClass("display-none");
                    this.collapse();
                });
        }
    }

    onCancelClick() {
        this.router.navigate(['homePage/CRMEnquiry']);
    }

    onRowClick(contactID: number) {
        this.router.navigate(['homePage/CRMEnquiry'], { queryParams: { ContactID: contactID } });
    }

    collapse() {
        if (this.isClicked) {
            this.isClicked = false;
            this.divClass = 'none';
        } else {
            this.isClicked = true;
            this.divClass = 'block';
        }
    }
}