import { Injectable } from '@angular/core';
import { GlobalService } from '../GlobalService/global.service'
import { Observable } from 'rxjs/Observable'
import { Http, Request, RequestOptions, Response, Headers, RequestMethod, URLSearchParams } from '@angular/http';
import 'rxjs/Rx';

@Injectable()
export class LoginService {

  baseurl: string;
  myHeaders = new Headers();
  options: any;

  constructor(private http: Http, private service: GlobalService) {
    this.baseurl = service.getBaseUrl();
  }

  Login(Login: any) {
    this.myHeaders = new Headers();
    let params: URLSearchParams = new URLSearchParams();

    let options = new RequestOptions({
      headers: this.myHeaders,
    });
    return this.http.post(this.baseurl + "Login/Login", Login, new Request(options))
      .map((response: Response) => response.json());

  }

}
