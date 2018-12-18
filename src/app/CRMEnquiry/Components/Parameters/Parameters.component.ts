import { Component, Input, Output, EventEmitter } from '@angular/core';
import { GlobalService } from '../../../GlobalService/global.service';
import { ActivatedRoute, Router } from '@angular/router';
import { ParametersService } from '../../Services/parameters.service'
import { Routes } from '../../Classes/Routes';

@Component({
    selector: 'parameters-screen',
    templateUrl: './Parameters.component.html',
    styleUrls: ['./Parameters.component.css']
})

export class ParametersComponent {
    displayedColumns: string[] = ['Route', 'Description'];
    dataSource: Routes[];
    routeCode: string = "";

    constructor(private parameterService: ParametersService
        , private gs: GlobalService
        , private route: ActivatedRoute
        , private router: Router) { }

    ngOnInit() {
        if (this.gs.checkToken()) {
            this.parameterService.GetList().subscribe(response => {
                this.dataSource = response;
            });
        }
    }

    ngOnChanges() { }

    onSaveClick() {
        this.router.navigate(['/homePage/OrdersForPrinting', this.routeCode]);


    }

    onCancelClick() { }

    Validation() { }

    goToOrderForPrinting(e) {
        this.router.navigate(['/homePage/OrdersForPrinting', e.RouteCode]);
    }

}