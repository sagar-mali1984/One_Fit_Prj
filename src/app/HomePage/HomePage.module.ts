import { NgModule, ModuleWithProviders } from '@angular/core';
import { CommonModule } from '@angular/common';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { Router,RouterModule } from '@angular/router';

import { DashboardComponent } from './Components/Dashboard/Dashboard.component';
import { HomePageComponent } from './Components/HomePage/HomePage.component';
import { HomePageService } from './HomePage.service';
import { CRMEnquiryModule } from './../CRMEnquiry/CRMEnquiry.module';

@NgModule({
    declarations: [
        HomePageComponent,
        DashboardComponent
    ],
    imports: [
        BrowserModule,
        FormsModule,
        ReactiveFormsModule,
        CommonModule,
        CRMEnquiryModule,
        RouterModule
    ],
    providers: [HomePageService],
    exports: []
})

export class HomePageModule {

}