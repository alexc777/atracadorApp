import { Component, OnInit } from '@angular/core';
import { UiService } from '../../../services/shared/UI/ui.service';
import { CreateOrderService } from '../../../services/orders/create-order.service';
import { IListOrders } from '../../../core/interfaces/orders.interface';
import { IErrorResponse } from '../../../core/interfaces/errorsResponse.interface';

@Component({
  selector: 'app-orders',
  templateUrl: './orders.page.html',
  styleUrls: ['./orders.page.scss'],
})
export class OrdersPage implements OnInit {

  arrOrders: IListOrders[] = []

  constructor(private uiService: UiService, private orderService: CreateOrderService) { }

  ngOnInit() {
    this.getOrders();
  }

  getOrders() {
    const l = this.uiService.presentLoading();
    this.orderService.getOrders().subscribe((response: IListOrders[]) => {
      this.uiService.dismissLoading(l);
      this.arrOrders = response;
    }, (error: IErrorResponse) => {
      this.uiService.dismissLoading(l);
      this.uiService.alertInfo('Error', error.errorDescription);
    });
  }

}
