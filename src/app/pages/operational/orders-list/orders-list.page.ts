import { Component, OnInit } from '@angular/core';
import { ActionSheetController } from '@ionic/angular';
import { CreateOrderService } from '../../../services/orders/create-order.service';
import { UiService } from '../../../services/shared/UI/ui.service';
import { IListOrders, IUpdateOrder } from '../../../core/interfaces/orders.interface';
import { IErrorResponse } from '../../../core/interfaces/errorsResponse.interface';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-orders-list',
  templateUrl: './orders-list.page.html',
  styleUrls: ['./orders-list.page.scss'],
})
export class OrdersListPage implements OnInit {

  public id_action: any;
  arrOrders: IListOrders[] = [];

  constructor(private actionSheetController: ActionSheetController, private uiService: UiService, private orderService: CreateOrderService,
              private routerP: ActivatedRoute) { }

  ngOnInit() {
    this.routerP.params.subscribe(params => {
      this.id_action = params.id;
    });

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

  async changeState(order: any) {
    const actionSheet = await this.actionSheetController.create({
      header: 'Cambiar Estado',
      buttons: [
        {
          text: 'Orden Entregada',
          handler: () => {
            this.editStatus(order, 2);
          }
        },
        {
          text: 'Orden Completada',
          handler: () => {
            this.editStatus(order, 3);
          }
        },
        {
          text: 'Orden Cancelada',
          handler: () => {
            this.editStatus(order, 4);
          }
        },
        {
          text: 'Salir',
          role: 'cancel',
          handler: () => {}
        }
      ]
    });

    await actionSheet.present();
  }

  editStatus(order: any, status: number) {
    const jsonEdit: IUpdateOrder = {
      id_order: order.id_order,
      status: status,
      user_action: this.id_action
    }

    const l = this.uiService.presentLoading();
    this.orderService.editStatusOrder(jsonEdit).subscribe(() => {
      this.uiService.presentToastSuccess('Orden Actualizada');
      this.uiService.dismissLoading(l);
      this.getOrders();
    },(error: any) => {
      this.uiService.dismissLoading(l);
      if (!this.uiService.presentAlert) {
        this.uiService.presentAlert = true;
        this.uiService.alertInfo('Error', error.errorDescription);
      }
    })
  }

}
