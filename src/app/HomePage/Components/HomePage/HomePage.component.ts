import { Component, Renderer2 } from '@angular/core';
import { HomePageService } from '../../HomePage.service';
import { Menu } from '../../Classes/Menu';
import { Cookie } from 'ng2-cookies/ng2-cookies';
import { Router } from '@angular/router';
import * as $ from 'jquery';
import { GlobalService } from '../../../GlobalService/global.service';

@Component({
    selector: 'HomePage',
    templateUrl: './HomePage.component.html'
})

export class HomePageComponent {

    menuList: Menu[] = [];
    subMenuOperation: string;

    constructor(private service: HomePageService, private router: Router, private gs: GlobalService) { }

    ngOnInit() {
        //debugger;
        //To load menu and submenulist
        // if (this.gs.checkToken()) {
        //     this.service.getMenus()
        //         .subscribe(data => {
        //             this.menuList = data;
        //         });
        // }

        
    }

    //To filter menu nad submenu
    filterItemsOfType(ParentKey) {
        return this.menuList.filter(x => x.ParentKey == ParentKey);
    }

    onMenuClick(menu) {
        if (menu == "Log Off") {
            Cookie.delete('LoginToken');
            this.router.navigate(['login']);
        }

    }

    onSubMenuClick(subMenu) {
        // debugger;
        if ($('.navbar-toggler').is(':visible')) {
            // debugger;
            $('.navbar-toggler').click();
        }

        // if (subMenu == "View Contact Record") {
        //     // debugger;
        //     $(".lblMainMenu").text("CRM Enquiry");
        //     this.router.navigate(['homePage/CRMEnquiry']);
        // }
        // else if (subMenu == "Search") {
        //     // debugger;
        //     $(".lblMainMenu").text("CRM Enquiry");
        //     this.router.navigate(['homePage/search']);
        // }

        // else if (subMenu == "Routes") {
        //     // debugger;
        //     $(".lblMainMenu").text("CRM Enquiry");
        //     this.router.navigate(['homePage/ROUTES']);
        // }

        $(".lblMainMenu").text("CRM Enquiry");
        this.router.navigate(['homePage/'+subMenu.Description]);

    }

    onCancelNotify(message: any): void {
        if (message === "GoToDashboard") {
            $(".lblMainMenu").text("Main Menu");
        }
    }
}