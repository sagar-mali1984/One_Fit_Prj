import { Injectable } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Cookie } from 'ng2-cookies/ng2-cookies';
import { Http, Request, RequestOptions, Response, Headers, RequestMethod, URLSearchParams } from '@angular/http';
import 'rxjs/Rx';

@Injectable()
export class GlobalService {

    myHeaders: Headers;
    options: any;
    constructor(private router: Router) { }

    getBaseUrl(): string {
        //WebAPI Service Path required to run the project locally
       return "http://localhost:55824/api/";
    //    return "http://owssr.logma.biz/api/";//client api

        //WebAPI Service Path required to run the project on server
         //return "http://dev.rhealtech.com/OneFitCRMAPI/api/";
    }

    //To check if token exists before each request
    checkToken() {
        // let AuthToken = JSON.parse(Cookie.get('LoginToken'));
        // if (AuthToken === null || (AuthToken !== null && AuthToken.token === '')) {
        //     this.router.navigate(['login']);
        //     return false;
        // }
        return true;
    }

    setCookie(data) {
        //var expireTime = 1/(60*24);   //For 1 min
        var expireTime = 1 / (3 * 24);      //For 20 min
        Cookie.set('LoginToken', JSON.stringify(data), expireTime);
    }

    setTokenToHeader(): any {
        let AuthToken = JSON.parse(Cookie.get('LoginToken'));
        this.setCookie(AuthToken);
        let token: string = 'Bearer ' + AuthToken.token;
        this.myHeaders = new Headers();
        this.myHeaders.append('Authorization', token);
        this.options = new RequestOptions({
            headers: this.myHeaders
        });
        return this.options;
    }

}
