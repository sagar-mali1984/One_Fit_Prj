import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable'
import { Http, Request, RequestOptions, Response, Headers, RequestMethod, URLSearchParams } from '@angular/http';
import 'rxjs/Rx';
import { Cookie } from 'ng2-cookies/ng2-cookies';

//#region Importing Classes
import { Contact } from './Classes/Contact';
import { ContactActivity } from './Classes/ContactActivity';
import { ContactPeople } from './Classes/ContactPeople';
//#endregion

//#region Importing Services
import { GlobalService } from '../GlobalService/global.service';
//#endregion

@Injectable()
export class CRMEnquiryService {

    baseurl: string;
    options: any;

    constructor(private http: Http, private service: GlobalService) {
        this.baseurl = service.getBaseUrl();
    }

    //#region Contacts

    listContacts(objContact: Contact) {
        this.options = this.service.setTokenToHeader();
        return this.http.post(this.baseurl + 'CRMEnquiry/ListContacts', objContact, new Request(this.options))
            .map(res => res.json());
    }

    loadContact(ContactId: number) {
        this.options = this.service.setTokenToHeader();
        return this.http.get(this.baseurl + 'CRMEnquiry/LoadContact/' + ContactId, new Request(this.options))
            .map(res => res.json());
    }

    saveContact(objContact: Contact) {
        this.options = this.service.setTokenToHeader();
        return this.http.post(this.baseurl + 'CRMEnquiry/SaveContact', objContact, new Request(this.options))
            .map(res => res.json());
    }

    //#endregion

    //#region ContactActivity

    listContactActivity(ContactRef: string) {
        this.options = this.service.setTokenToHeader();
        return this.http.get(this.baseurl + 'CRMEnquiry/ListContactActivity/' + ContactRef, new Request(this.options))
            .map(res => res.json());
    }

    listContactActivityTypes() {
        this.options = this.service.setTokenToHeader();
        return this.http.get(this.baseurl + 'CRMEnquiry/ListContactActivityTypes', new Request(this.options))
            .map(res => res.json());
    }

    listUsers() {
        this.options = this.service.setTokenToHeader();
        return this.http.get(this.baseurl + 'Login/ListUsers', new Request(this.options))
            .map(res => res.json());
    }

    saveContactActivity(objContactActivity: ContactActivity) {
        this.options = this.service.setTokenToHeader();
        return this.http.post(this.baseurl + 'CRMEnquiry/SaveContactActivity', objContactActivity, new Request(this.options))
            .map(res => res.json());
    }

    //#endregion

    //#region ContactPeople

    listContactPeople(ContactRef: string) {
        this.options = this.service.setTokenToHeader();
        return this.http.get(this.baseurl + 'CRMEnquiry/ListContactPeople/' + ContactRef, new Request(this.options))
            .map(res => res.json());
    }

    loadContactPeople(RecordID: number) {
        this.options = this.service.setTokenToHeader();
        return this.http.get(this.baseurl + 'CRMEnquiry/LoadContactPeople/' + RecordID, new Request(this.options))
            .map(res => res.json());
    }

    saveContactPeople(objContactPeople: ContactPeople) {
        this.options = this.service.setTokenToHeader();
        return this.http.post(this.baseurl + 'CRMEnquiry/SaveContactPeople', objContactPeople, new Request(this.options))
            .map(res => res.json());
    }
    deleteContactPeople(RecordID: number) {
        this.options = this.service.setTokenToHeader();
        return this.http.delete(this.baseurl + 'CRMEnquiry/DeleteContactPeople/' + RecordID, new Request(this.options))
            .map(res => res.json());
    }

    //#endregion
}