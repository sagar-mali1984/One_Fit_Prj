import { NgModule, ModuleWithProviders } from '@angular/core';
import { CommonModule } from '@angular/common';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { LoginComponent } from './Components/Login/Login.component';
import { NgbdModalContent } from './Components/Login/Login.component';

import { LoginNewComponent } from './Components/LoginNew/LoginNew.component';
import { NgbdModalContentNew} from './Components/LoginNew/LoginNew.component';

import { LoginService } from './login.service';

//import { NgbModule } from '@ng-bootstrap/ng-bootstrap';

@NgModule({
    declarations: [
        LoginComponent,
        LoginNewComponent,
        NgbdModalContent,
        NgbdModalContentNew
    ],
    entryComponents: [NgbdModalContent,NgbdModalContentNew],
    imports: [
        BrowserModule,
        FormsModule,
        ReactiveFormsModule,
      //  NgbModule.forRoot(),
        CommonModule
    ],
    providers: [LoginService],
    exports: [LoginComponent]
})
export class LoginModule {

}