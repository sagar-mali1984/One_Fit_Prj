import { Injectable } from '@angular/core';
import { GlobalService } from '../GlobalService/global.service'
import { Observable } from 'rxjs/Observable'
import { Http, Request, RequestOptions, Response, Headers, RequestMethod, URLSearchParams } from '@angular/http';
import 'rxjs/Rx';
import { Cookie } from 'ng2-cookies/ng2-cookies'

@Injectable()
export class HomePageService {
  baseurl: string;
  options: any;
  constructor(private http: Http, private service: GlobalService) {
    this.baseurl = service.getBaseUrl();
  }

  getMenus() {
    this.options = this.service.setTokenToHeader();
    return this.http.get(this.baseurl + 'HomePage/MenuGetList', new Request(this.options))
      .map(res => res.json());
  }

}