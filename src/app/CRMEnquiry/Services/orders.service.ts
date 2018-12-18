import { Injectable } from '@angular/core';
import{GlobalService} from '../../GlobalService/global.service'
import { Http, Request, RequestOptions, Response, Headers, RequestMethod, URLSearchParams } from '@angular/http';
import 'rxjs/Rx';

@Injectable()
export class OrdersService {

    baseurl: string;
  myHeaders = new Headers();
  options: any;

  constructor(private _http:Http,private gs:GlobalService){
    this.baseurl = gs.getBaseUrl();
  }

  GetOrdersForPrinting(InputData:any){

    this.options=this.gs.setTokenToHeader();

    return this._http.post(this.baseurl + "Routes/GetOrdersForPrinting", InputData,new Request(this.options)).map(response=>response.json());

  }

  GetOrdersForPrintingDateFilter(InputData:any){

    this.options=this.gs.setTokenToHeader();

    return this._http.post(this.baseurl + "Routes/GetOrdersForPrintingDateFilter", InputData,new Request(this.options)).map(response=>response.json());

  }

}