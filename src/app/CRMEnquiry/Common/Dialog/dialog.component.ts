import { Component, OnInit, Inject, ViewEncapsulation } from '@angular/core';
// import { Router } from '@angular/router';
// import { GlobalService } from '../../../GlobalService/global.service';
// import { OrdersService } from '../../Services/orders.service';
// import { Order } from '../../Classes/Order';
// import { ActivatedRoute } from '@angular/router';
 import {MatDialog, MatDialogRef, MAT_DIALOG_DATA} from '@angular/material';
 
// export interface DialogData {
//   animal: string;
//   name: string;
// }

// @Component({
//   selector: 'dialog',
//   templateUrl: './dialog.component.html',
//   styleUrls:['./dialog.component.scss',],
//   encapsulation:ViewEncapsulation.None
// })
// export class DialogComponent {

//   constructor(
//     public dialogRef: MatDialogRef<DialogComponent>,
//     @Inject(MAT_DIALOG_DATA) public data: DialogData) {}

//   onNoClick(): void {
//     this.dialogRef.close();
//   }

// }



export interface DialogData {
  animal: string;
  name: string;
}

@Component({
  selector: 'dialog',
  templateUrl: 'dialog.component.html',
})
export class DialogOverviewExampleDialog {

  constructor(
    public dialogRef: MatDialogRef<DialogOverviewExampleDialog>,
    @Inject(MAT_DIALOG_DATA) public data: DialogData) {}

  onNoClick(): void {
    this.dialogRef.close();
  }

}
