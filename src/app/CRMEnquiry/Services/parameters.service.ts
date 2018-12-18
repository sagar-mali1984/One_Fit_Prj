import { Injectable } from '@angular/core';
import{GlobalService} from '../../GlobalService/global.service'
import { Http, Request, RequestOptions, Response, Headers, RequestMethod, URLSearchParams } from '@angular/http';
import 'rxjs/Rx';

@Injectable()
export class ParametersService {

  baseurl: string;
  myHeaders = new Headers();
  options: any;

  constructor(private http: Http, private service: GlobalService) {
    this.baseurl = service.getBaseUrl();
  }

  

  GetList() {
    this.options = this.service.setTokenToHeader();
    return this.http.get(this.baseurl + "Caterer/Despatch/ListRoutes",new Request(this.options))
      .map((response: Response) => response.json());

  }

}