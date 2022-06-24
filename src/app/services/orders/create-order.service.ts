import { Injectable } from '@angular/core';
import { ErrorsService } from '../shared/handleError/errors.service';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { environment } from '../../../environments/environment';
import { EndPoint } from '../end-point-share';
import { IResponseOrder, IUpdateOrder, ICreateOrder } from '../../core/interfaces/orders.interface';
import { catchError, map } from 'rxjs/operators';
import { IResponseMenu } from '../../core/interfaces/menu.interface';

@Injectable({
  providedIn: 'root'
})
export class CreateOrderService {

  menus: any[] = [];

  carrito: any[] = [];
  productoRepetido = false;
  totalVenta = 0;

  constructor(private http: HttpClient, private errorService: ErrorsService) { }

  get headers() {
    return {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
      })
    };
  }

  getOrders() {
    const url = environment.api + EndPoint.getOrders;

    return this.http.get(url, this.headers).pipe(
      map((resp: IResponseOrder) => resp.data),catchError((err: any) => this.errorService.handleError(err))
    );
  }

  editStatusOrder(json: IUpdateOrder) {
    const url = environment.api + EndPoint.editOrder;

    return this.http.post(url, json, this.headers).pipe(
      map(() => {}),catchError((err: any) => this.errorService.handleError(err))
    );
  }

  getMenus() {
    const url = environment.api + EndPoint.getMenus;

    return this.http.get(url, this.headers).pipe(
      map((resp: IResponseMenu) => {
        this.menus = resp.data;
        this.menus.forEach(element => {
          element.showAgregar = true;
          element.showButtonsAdd = false;
          element.cantidadProducto = 0;
        });

        return this.menus;
      }),catchError((err: any) => this.errorService.handleError(err))
    );
  }

  /**
  *
  * Funciones para proceso de carrito
  *
  */
  agregarCarrito(menu: any) {
    this.productoRepetido = false;

    this.carrito.forEach(element => {
      if (element.id_menu === menu.id_menu) {
        element.cantidadProducto++;
        this.productoRepetido = true;
      }
    });

    if (!this.productoRepetido) {
      menu.cantidadProducto++;
      this.carrito.push(menu);
    }

    this.totalCarrito();
  }

  eliminarPoductoItem(menu: any) {
    let idx = 0;
    for (let i = 0; i < this.carrito.length; i++) {
      const product = this.carrito[i];
      if (menu.id_menu === product.id_menu) {
        idx = i;
      }
    }

    this.carrito.splice(idx, 1);
    this.totalCarrito();
  }

  totalCarrito() {
    this.totalVenta = 0;

    for (const i of this.carrito) {
      this.totalVenta += (i.price * i.cantidadProducto);
    }
  }

  varciarCarrito() {
    this.carrito = [];
    this.productoRepetido = false;
    this.totalVenta = 0;
  }

  createOrder(json: ICreateOrder) {
    const url = environment.api + EndPoint.createOrder;

    return this.http.post(url, json, this.headers).pipe(
      map(() => {}),catchError((err: any) => this.errorService.handleError(err))
    );
  }
}
