import { NgModule } from '@angular/core';

import {
    MatAutocompleteModule,
    MatButtonModule,
    MatButtonToggleModule,
    MatCardModule,
    MatCheckboxModule,
    MatChipsModule,
    MatDatepickerModule,
    MatDialogModule,
    MatDividerModule,
    MatExpansionModule,
    MatGridListModule,
    MatIconModule,
    MatInputModule,
    MatListModule,
    MatMenuModule,
    MatNativeDateModule,
    MatPaginatorModule,
    MatProgressBarModule,
    MatProgressSpinnerModule,
    MatRadioModule,
    MatRippleModule,
    MatSelectModule,
    MatSidenavModule,
    MatSliderModule,
    MatSlideToggleModule,
    MatSnackBarModule,
    MatSortModule,
    MatStepperModule,
    MatTableModule,
    MatTabsModule,
    MatToolbarModule,
    MatTooltipModule,
} from '@angular/material';
import { CommonModule } from '@angular/common';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NgbModule, NgbDatepicker, NgbTimepicker } from '@ng-bootstrap/ng-bootstrap';

//#region Importing Components
import { CRMEnquiryComponent } from './Components/CRMEnquiry/CRMEnquiry.component';
import { CRMEnquirySearchComponent } from './Components/CRMEnquirySearch/CRMEnquirySearch.component';
import { DetailsComponent } from './Components/Details/Details.component';
import { PeopleComponent } from './Components/People/People.component';
import { AddEditContactComponent } from './Components/AddEditContact/AddEditContact.component';
import { AddEditContactActivityComponent } from './Components/AddEditContactActivity/AddEditContactActivity.component';
import { AddEditContactPeopleComponent } from './Components/AddEditContactPeople/AddEditContactPeople.component';
import { TabComponent } from './Components/Tabbing/tab.component';
import { ParametersComponent } from './Components/Parameters/Parameters.component';
import { OrdersForPrintingComponent } from './Components/ordersForPrinting/ordersForPrinting.component';
// import { OtherOptionsComponent } from './Components/CRMEnquiryPage/OtherOptions/OtherOptions.component';
// import { SelectCompanyComponent } from './Components/CRMEnquiryPage/SelectCompany/SelectCompany.component';
// import { CRMEnquiryOtherOptionsComponent } from './Components/CRMEnquiryPage/CRMEnquiryOtherOptions/CRMEnquiryOtherOptions.component';
// import { CRMEnquiryDetailsComponent } from './Components/CRMEnquiryPage/CRMEnquiryDetails/CRMEnquiryDetails.component';
// import { CRMEnquiryTabsComponent } from './Components/CRMEnquiryPage/CRMEnquiryTabs/CRMEnquiryTabs.component';

import { NgSelectModule } from '@ng-select/ng-select';
import { BsDropdownModule } from 'ngx-bootstrap/dropdown';

//#endregion

//#region Importing Services
import { CRMEnquiryService } from './CRMEnquiry.service';
//import { GlobalService } from '../GlobalService/Global.service';
import { ParametersService } from './Services/parameters.service';
import { OrdersService } from './Services/orders.service';
import { DialogOverviewExampleDialog } from './Common/Dialog/dialog.component';



//#endregion


@NgModule({
    declarations: [
        CRMEnquiryComponent,
        CRMEnquirySearchComponent,
        DetailsComponent,
        PeopleComponent,
        AddEditContactComponent,
        AddEditContactActivityComponent,
        AddEditContactPeopleComponent,
        TabComponent,
        ParametersComponent,
        OrdersForPrintingComponent,
        DialogOverviewExampleDialog
        // OtherOptionsComponent,
        // SelectCompanyComponent,
        // CRMEnquiryOtherOptionsComponent,
        // CRMEnquiryDetailsComponent,
        // CRMEnquiryTabsComponent
    ],
    imports: [
        BrowserModule,
        FormsModule,
        ReactiveFormsModule,
        CommonModule,

        MatAutocompleteModule,
        MatButtonModule,
        MatButtonToggleModule,
        MatCardModule,
        MatCheckboxModule,
        MatChipsModule,
        MatDatepickerModule,
        MatDialogModule,
        MatDividerModule,
        MatExpansionModule,
        MatGridListModule,
        MatIconModule,
        MatInputModule,
        MatListModule,
        MatMenuModule,
        MatNativeDateModule,
        MatPaginatorModule,
        MatProgressBarModule,
        MatProgressSpinnerModule,
        MatRadioModule,
        MatRippleModule,
        MatSelectModule,
        MatSidenavModule,
        MatSliderModule,
        MatSlideToggleModule,
        MatSnackBarModule,
        MatSortModule,
        MatStepperModule,
        MatTableModule,
        MatTabsModule,
        MatToolbarModule,
        MatTooltipModule,

        NgbModule.forRoot(), NgSelectModule, BsDropdownModule.forRoot()
    ],
    providers: [CRMEnquiryService, NgbDatepicker, NgbTimepicker, ParametersService, OrdersService],
    exports: [CRMEnquiryComponent, MatTabsModule, MatTableModule, MatCardModule, MatDialogModule],

})
export class CRMEnquiryModule {

}