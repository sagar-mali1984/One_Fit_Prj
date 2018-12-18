import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { OrdersForPrintingComponent } from './ordersForPrinting.component';

describe('OrdersComponent', () => {
  let component: OrdersForPrintingComponent;
  let fixture: ComponentFixture<OrdersForPrintingComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ OrdersForPrintingComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(OrdersForPrintingComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
