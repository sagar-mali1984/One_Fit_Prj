import {CollectionViewer, DataSource} from "@angular/cdk/collections";
import { Order } from "../Classes/Order";
import { BehaviorSubject,Observable } from "rxjs";
import { OrdersService } from "../Services/orders.service";
export class OrderDataSource implements DataSource<Order>{

    private orderSubject = new BehaviorSubject<Order[]>([]);
    private loadingOrder = new BehaviorSubject<boolean>(false);
    public loading$ = this.loadingOrder.asObservable();

    constructor(private ordersService: OrdersService) {}

    connect(collectionViewer: CollectionViewer): Observable<Order[]> {
        return this.orderSubject.asObservable();
    }

    disconnect(collectionViewer: CollectionViewer): void {
        this.orderSubject.complete();
        this.loadingOrder.complete();
    }




}