import { Component, OnInit, Inject,ViewEncapsulation } from '@angular/core';
import { Router } from '@angular/router';
import { GlobalService } from '../../../GlobalService/global.service';
import { OrdersService } from '../../Services/orders.service';
import { Order } from '../../Classes/Order';
import { ActivatedRoute } from '@angular/router';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { DialogOverviewExampleDialog } from '../../Common/Dialog/dialog.component';


@Component({
  selector: 'app-ordersForPrinting',
  templateUrl: './ordersForPrinting.component.html',
  styleUrls: ['./ordersForPrinting.component.css'],
  encapsulation: ViewEncapsulation.None
})

export class OrdersForPrintingComponent implements OnInit {
  //#region INSTANCE VARIABLE
  isPicking = false;
  isPicked = false;
  isPrint = false;
  isPick = false;
  isVisible: boolean = false;


  RowCount: number;
  routeCode: string;
  private sub: any;
  TotalPages: number;
  PaginationTitle: string;
  animal: string;
  name: string;
  defaultPagination: number;
  advancedPagination: number;
  paginationSize: number;
  disabledPagination: number;

  PageSize: number = 5;
  SortBy: string = '';
  SortDirection: string = ""
  PageNumber: number = 1;
  SearchText: string = "";
  SearchFilter: string = "";


  RouteName: string = ""; dataSource: Order[];
  SearchByColumnName: string = "CustomerName";
  displayedColumns: string[] = ['CustomerName', 'OrderNumber', 'RouteCode', 'DropCode'];


  constructor(private router: Router, private gs: GlobalService, private ordersService: OrdersService,
    private route: ActivatedRoute, public dialog: MatDialog) {
    this.defaultPagination = 1;
    this.advancedPagination = 1;
    this.paginationSize = 1;
    this.disabledPagination = 1;
  }


  ngOnInit() {
    this.isPrint = true;
    this.sub = this.route.params.subscribe(params => {
      if (params.RouteCode != undefined)
        this.routeCode = "RouteCode='" + params.RouteCode + "'";
      else
        this.routeCode = "RouteCode=''";

      this.RouteName = (params.RouteCode === "" || params.RouteCode === undefined) ? "All Routes" : params.RouteCode;
    });

    this.LoadData();

  }

  sortData(e, PageNumber, PageSize) {
    this.isVisible = true;
    this.SortBy = e.active;
    this.SortDirection = e.direction;
    this.LoadData();

  }

  LoadData() {
    if (this.gs.checkToken()) {
      var InputData = {
        Filter: this.routeCode
        , SortBy: this.SortBy + " " + this.SortDirection
        , PageNo: this.PageNumber
        , PageSize: this.PageSize
      };

      this.ordersService.GetOrdersForPrinting(InputData).subscribe(response => {
        this.dataSource = response;
        this.RowCount = response[0].RowCount;
        this.isVisible = false;
      });
    }
  }

  onRefreshClick() { }

  onPickListClick() { }

  onGoClick(value) { }

  onChangeClick() {
    this.router.navigate(['homePage/Routes']);
  }

  onPickClick() {
    this.isPick = true;
  }

  onTabChange(event) {
    this.isPick = false;
    this.isPicking = false;
    this.isPicked = false;
    this.isPrint = false;

    if (event.index == 0) {
      this.isPrint = true;
    } else if (event.index == 1) {
      this.isPicking = true;
    } else if (event.index == 2) {
      this.isPicked = true;
    }
  }

  onDoneClick() { }

  onCancelClick() { }

  openDialog(): void {
    const dialogRef = this.dialog.open(DialogOverviewExampleDialog, {

      height: '260px',
      width: '250px',
      data: { name: this.name, animal: this.animal }
    });

    dialogRef.afterClosed().subscribe(result => {
      console.log('The dialog was closed');
      this.animal = result;
    });
  }

  //   validateDate(tempDate1) {
  //     debugger
  //     var date_regex = /^(0[1-9]|1[0-2])\/(0[1-9]|1\d|2\d|3[01])\/(19|20)\d{2}$/ ;
  //     return date_regex.test(tempDate1);
  // }

onRowClicked(row) {

  }
}
