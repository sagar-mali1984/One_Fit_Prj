import { Component, Renderer2,Input } from '@angular/core';
import { LoginService } from '../../login.service';
import { User } from '../../Classes/User';
import { Cookie } from 'ng2-cookies/ng2-cookies';
import { Router } from '@angular/router';
import * as $ from 'jquery';
import {NgbModal, NgbActiveModal} from '@ng-bootstrap/ng-bootstrap';


@Component({
    selector: 'ngbd-modal-content',
    template: `
      <div class="modal-header">
        <h4 class="modal-title">{{message}}</h4>
        <button type="button" class="close" aria-label="Close" (click)="activeModal.dismiss('Cross click')">
          <span aria-hidden="true">&times;</span>
        </button>
      </div>
      <div class="modal-body">
        <p>{{content}}</p>
      </div>
      <div class="modal-footer">
        <button type="button" class="btn btn-outline-dark" (click)="activeModal.close('Close click')">Close</button>
      </div>
    `
  })
  export class NgbdModalContent {
    @Input() name;
  
    constructor(public activeModal: NgbActiveModal) {}
  }

@Component({
    selector: 'login',
    templateUrl: './login.component.html'
})

export class LoginComponent {

    objUser: User = new User();
    errorMessage: string = "";
    //ForgotPassword: string = "";

    constructor(private router: Router, private renderer: Renderer2, private service: LoginService,private modalService: NgbModal) {
        this.renderer.addClass(document.body, 'login-background');
        let AuthToken = JSON.parse(Cookie.get('LoginToken'));
        if (AuthToken !== null && AuthToken.Token !== '') {
            this.router.navigate(['homePage']);
            this.errorMessage = "";
        }
    }

    ngOnDestroy() {
        this.renderer.removeClass(document.body, 'login-background');
    }

    Login() {
        if (this.Validation()) {
            this.service.Login(this.objUser)
                .subscribe(data => {
                   // debugger;
                    if (data.Token != '') {
                        var now = new Date();
                        var time = now.getTime();
                        var LoginData = { 'token': data.Token };
                        var expireTime = 1 / (3 * 24);      //For 20 min
                        Cookie.set('LoginToken', JSON.stringify(LoginData), expireTime);
                        this.router.navigate(['homePage/dashboard']);
                    }
                    else {
                       // this.errorMessage = "Invalid Username or Password. Please try again";
                       this.open('ValidateUsernamePwd');
                    }
                },
                error => {
                    this.errorMessage = <any>error;
                    this.errorMessage = "Something went wrong!!..";
                });
        }

    }

    Validation() {
        if (this.objUser.UserName == "" || this.objUser.UserName == null) {
           // this.errorMessage = "Please enter UserName";
            this.open('ValidateUsername');
            $("#txtUserName").focus();
            return false;
        }
        else if (this.objUser.Password == "" || this.objUser.Password == null) {
            //this.errorMessage = "Please enter Password";
            this.open('ValidatePassword');
            $("#txtPassword").focus();
            return false;
        }
        else
            return true;
    }

    // ForgotPwd() {
    //     debugger;
    //    // $("#modalNotTexas").modal('show');
    //     this.ForgotPassword = "Please call a member of our Customer Services Team on 01257 233123";
    // }

    // modalClose() {
    //     $('#modalNotTexas').modal('hide');
    //   }

    // closeResult: string;
  
//     open(content) {
//       this.modalService.open(content).result.then((result) => {
//           this.errorMessage = "Please call a member of our Customer Services Team on 01257 233123";
// //this.closeResult = `Closed with: ${result}`;
//       }, (reason) => {
//       //  this.closeResult = `Dismissed ${this.getDismissReason(reason)}`;
//       });
//     }
  
    // private getDismissReason(reason: any): string {
    //   if (reason === ModalDismissReasons.ESC) {
    //     return 'by pressing ESC';
    //   } else if (reason === ModalDismissReasons.BACKDROP_CLICK) {
    //     return 'by clicking on a backdrop';
    //   } else {
    //     return  `with: ${reason}`;
    //   }
    // }


// @Component({
//   selector: 'ngbd-modal-component',
//   templateUrl: './modal-component.html'
// })
// export class NgbdModalComponent {
//   constructor(private modalService: NgbModal) {}

  open(test:string) {
    const modalRef = this.modalService.open(NgbdModalContent);
    if(test === "ForgotPwd")
    {
        modalRef.componentInstance.content =  "Please call a member of our Customer Services Team on 01257 233123";
        modalRef.componentInstance.message = "Message"; 
    }
    else if(test === "ValidateUsername")
    {
        modalRef.componentInstance.content =  "Please enter UserName";
        modalRef.componentInstance.message = "ValidationMessage";
    }
    else if (test === 'ValidatePassword')
    {
        modalRef.componentInstance.content =  "Please enter Password";
        modalRef.componentInstance.message = "ValidationMessage";
    }
    else if (test === 'ValidateUsernamePwd')
    {
        modalRef.componentInstance.content =  "Invalid Username or Password. Please try again";
        modalRef.componentInstance.message = "ValidationMessage";
    }
   
}


//}

}