import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { LoginComponent } from './Login/Components/Login/Login.component';
import { LoginNewComponent } from './Login/Components/LoginNew/LoginNew.component'
import { HomePageComponent } from './HomePage/Components/HomePage/HomePage.component';
import { CRMEnquirySearchComponent } from './CRMEnquiry/Components/CRMEnquirySearch/CRMEnquirySearch.component';
import { CRMEnquiryComponent } from './CRMEnquiry/Components/CRMEnquiry/CRMEnquiry.component';
import { AddEditContactComponent } from './CRMEnquiry/Components/AddEditContact/AddEditContact.component';
import { AddEditContactActivityComponent } from './CRMEnquiry/Components/AddEditContactActivity/AddEditContactActivity.component';
import { AddEditContactPeopleComponent } from './CRMEnquiry/Components/AddEditContactPeople/AddEditContactPeople.component';
import { DashboardComponent } from './HomePage/Components/Dashboard/Dashboard.component';
import { TabComponent } from './CRMEnquiry/Components/Tabbing/tab.component';
import { ParametersComponent} from './CRMEnquiry/Components/Parameters/Parameters.component';
import {  OrdersForPrintingComponent} from './CRMEnquiry/Components/ordersForPrinting/ordersForPrinting.component';
import { DialogOverviewExampleDialog } from './CRMEnquiry/Common/Dialog/dialog.component';
// import { CRMEnquiryOtherOptionsComponent } from './CRMEnquiry/Components/CRMEnquiryPage/CRMEnquiryOtherOptions/CRMEnquiryOtherOptions.component';
// import { CRMEnquiryDetailsComponent } from './CRMEnquiry/Components/CRMEnquiryPage/CRMEnquiryDetails/CRMEnquiryDetails.component';


const routes: Routes = [
    // { path: 'login', component: LoginComponent, pathMatch: 'full' },
    { path: 'login', component: LoginNewComponent, pathMatch: 'full' },
    {
        path: 'homePage', component: HomePageComponent,
        children: [
            {path:'OrdersForPrinting',component:OrdersForPrintingComponent},
            {path:'OrdersForPrinting/:RouteCode',component:OrdersForPrintingComponent},
            { path: 'search', component: CRMEnquirySearchComponent },
            { path: 'CRMEnquiry', component: CRMEnquiryComponent },
            // { path: 'CRMEnquiry', component: CRMEnquiryOtherOptionsComponent },
            // { path: 'CRMEnquiryDetails', component: CRMEnquiryDetailsComponent },
            { path: 'addContact', component: AddEditContactComponent },
            { path: 'addContactActivity', component: AddEditContactActivityComponent },
            { path: 'addContactPeople', component: AddEditContactPeopleComponent },
            { path: 'dashboard', component: DashboardComponent },
            { path: 'tab', component:TabComponent},
            {path:'Routes',component:ParametersComponent}, 
                      
            { path: '', redirectTo: 'dashboard', pathMatch: 'full' },
            
        ]
    },
    {path:'Dialog',component:DialogOverviewExampleDialog, pathMatch: 'full' },  
    { path: '', redirectTo: 'login', pathMatch: 'full' }
];

/**
 * App routing module
 */

@NgModule({
    imports: [
        RouterModule.forRoot(routes)
    ],
    exports: [RouterModule]
})

export class AppRoutingModule { }

