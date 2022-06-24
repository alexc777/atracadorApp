import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { CreateOrderService } from '../../../../services/orders/create-order.service';
import { UiService } from '../../../../services/shared/UI/ui.service';
import { ICreateOrder, IMenuOrder } from '../../../../core/interfaces/orders.interface';
import { AlertController, NavController } from '@ionic/angular';

@Component({
  selector: 'app-select-menus',
  templateUrl: './select-menus.page.html',
  styleUrls: ['./select-menus.page.scss'],
})
export class SelectMenusPage implements OnInit {

  arrMenus:any[] = [];

  infoOrder: any = {};

  comments:any = 'N/A';

  constructor(private router: ActivatedRoute, public createOrderService: CreateOrderService, private UIServices: UiService,
              private alertController: AlertController, public navCtrl: NavController) { }

  ngOnInit() {
    this.router.queryParams.subscribe(params => {
      if (params && params.datosOrder) {
        this.infoOrder = JSON.parse(params.datosOrder);
      }
    });

    this.getMenus();
  }

  getMenus() {
    this.arrMenus = this.createOrderService.getProductos();
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
      id_user: 3,
      user_action: 3,
      menus: detalle
    };

    console.log('Crear orden: ', jsonOrder);

    const l = this.UIServices.presentLoading();
    setTimeout(() => {
      this.UIServices.dismissLoading(l);
      this.alertOrder();
    }, 1000);

  }

  async alertOrder() {
    const alert = await this.alertController.create({
      header: 'Aviso',
      message: 'Ordern Creada',
      buttons: [
        {
          text: 'Aceptar',
          handler: () => {
            this.navCtrl.navigateRoot(['/home'],{ replaceUrl: true, animated: true });
          }
        }
      ]
    });

    await alert.present();
  }



}
