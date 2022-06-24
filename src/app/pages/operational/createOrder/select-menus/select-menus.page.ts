import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { CreateOrderService } from '../../../../services/orders/create-order.service';
import { UiService } from '../../../../services/shared/UI/ui.service';
import { ICreateOrder, IMenuOrder } from '../../../../core/interfaces/orders.interface';
import { AlertController, NavController } from '@ionic/angular';
import { IErrorResponse } from '../../../../core/interfaces/errorsResponse.interface';

@Component({
  selector: 'app-select-menus',
  templateUrl: './select-menus.page.html',
  styleUrls: ['./select-menus.page.scss'],
})
export class SelectMenusPage implements OnInit {

  public id_action: any;

  arrMenus:any[] = [];

  infoOrder: any = {};

  comments:any = 'N/A';

  constructor(private router: ActivatedRoute, public createOrderService: CreateOrderService, private UIServices: UiService,
              private alertController: AlertController, public navCtrl: NavController, private routerP: ActivatedRoute) { }

  ngOnInit() {
    this.router.queryParams.subscribe(params => {
      if (params && params.datosOrder) {
        this.infoOrder = JSON.parse(params.datosOrder);
      }
    });

    this.routerP.params.subscribe(params => {
      this.id_action = params.id;
    });

    this.getMenus();
  }

  getMenus() {
    const l = this.UIServices.presentLoading();
    this.createOrderService.getMenus().subscribe((response: any[]) => {
      this.UIServices.dismissLoading(l);
      this.arrMenus = response;
    }, (error: IErrorResponse) => {
      this.UIServices.dismissLoading(l);
      this.UIServices.alertInfo('Error', error.errorDescription);
    });
  }

  activeAgregarProducto(menu: any) {
    if (menu.status === 1) {
      menu.showAgregar = false;
      menu.showButtonsAdd = true;
      this.createOrderService.agregarCarrito(menu);
      this.UIServices.presentToastSuccess(`Menú ${menu.name} agregado`);
    } else {
      this.UIServices.presentToastDanger(`Ya no hay unidades disponibles de: ${menu.name}`);
    }
  }

  agregarProducto(menu: any) {
    if (menu.status === 1) {
      this.createOrderService.agregarCarrito(menu);
      this.UIServices.presentToastSuccess(`Menú ${menu.name} agregado`);
    } else {
      this.UIServices.presentToastInfo(`Ya no hay unidades disponibles de: ${menu.name}`);
    }
  }

  eliminarProducto(menu: any) {
    if (menu.cantidadProducto > 1) {
      menu.cantidadProducto --;
      this.createOrderService.totalCarrito();
      this.UIServices.presentToastInfo(`Orden actualizada`);
    } else {
      if (menu.cantidadProducto === 1) {
        menu.cantidadProducto--;
        this.createOrderService.eliminarPoductoItem(menu);
        this.UIServices.presentToastDanger(`Producto ${menu.name} eliminado`);
      } else {
        this.UIServices.presentToastInfo(`El producto: ${menu.name} no esta agregado`);
      }
    }
  }

  createOrder() {
    const detalle: any = [];
    let detalles: any = {};

    this.createOrderService.carrito.forEach((element: any) => {
      detalles = {};
      detalles.id_menu = element.id_menu,
      detalles.price = element.price,
      detalles.quantity = element.cantidadProducto,
      detalles.sub_total = (element.price * element.cantidadProducto),
      detalle.push(detalles);
    });

    const jsonOrder: ICreateOrder = {
      comments: this.comments ,
      total: this.createOrderService.totalVenta,
      id_table: this.infoOrder.id_table,
      id_user: this.id_action,
      user_action: this.id_action,
      menus: detalle
    };

    const l = this.UIServices.presentLoading();
    this.createOrderService.createOrder(jsonOrder).subscribe(() => {
      this.UIServices.dismissLoading(l);
      this.alertOrder();
    }, (error: IErrorResponse) => {
      this.UIServices.dismissLoading(l);
      this.UIServices.alertInfo('Error', error.errorDescription);
    });
  }

  async alertOrder() {
    const alert = await this.alertController.create({
      header: 'Aviso',
      message: 'Orden Creada',
      buttons: [
        {
          text: 'Aceptar',
          handler: () => {
            this.navCtrl.navigateRoot([`/home/${this.id_action}`],{ replaceUrl: true, animated: true });
          }
        }
      ]
    });

    await alert.present();
  }

}
