import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { CommonModule, HashLocationStrategy, LocationStrategy } from '@angular/common';
import { AppComponent } from './app.component';
import { HttpModule } from '@angular/http';
import * as $ from 'jquery';
import { regExpEscape } from '@ng-bootstrap/ng-bootstrap/util/util';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';

//#region Importing Modules
import { LoginModule } from './Login/Login.module';
import { HomePageModule } from './HomePage/HomePage.module';
import { CRMEnquiryModule } from './CRMEnquiry/CRMEnquiry.module';
import { AppRoutingModule } from './app_routing.module';


//#endregion]

//#region Importing Services
import { GlobalService } from './GlobalService/global.service';

//#endregion]

//import { NgbModule, NgbPopover } from '@ng-bootstrap/ng-bootstrap';

@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    LoginModule,
    CRMEnquiryModule,
    AppRoutingModule,
    HttpModule,
    HomePageModule,
    CommonModule,
    BrowserAnimationsModule
   // NgbModule.forRoot()
  ],
  providers: [
    GlobalService,
    { provide: LocationStrategy, useClass: HashLocationStrategy }
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
