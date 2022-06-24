import { Injectable } from '@angular/core';
import { ErrorsService } from '../shared/handleError/errors.service';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { environment } from '../../../environments/environment';
import { EndPoint } from '../end-point-share';
import { IResponseOrder } from '../../core/interfaces/orders.interface';
import { catchError, map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class CreateOrderService {

  menus: any[] = [
    {
        "id_menu": 1,
        "name": "Caldo de pezcado",
        "description": "Lorem ipsum dolor sit amet consectetur adipisicing elit. Quos laborum, quasi vitae laudantium, tenetur odit officiis praesentium id itaque fugit labore commodi! Modi maiores, illum voluptate nulla dicta quam ad?",
        "price": 45,
        "status": 1
    },
    {
        "id_menu": 2,
        "name": "Mojarra frita",
        "description": "Lorem ipsum dolor sit amet consectetur adipisicing elit. Quos laborum, quasi vitae laudantium, tenetur odit officiis praesentium id itaque fugit labore commodi! Modi maiores, illum voluptate nulla dicta quam ad?",
        "price": 25,
        "status": 2
    },
    {
        "id_menu": 3,
        "name": "Camarones al ajillo",
        "description": "Delicioso plato de 30 camarones sasonados y preparados con cebolla y salsa de ajo...",
        "price": 60,
        "status": 1,
    },
    {
        "id_menu": 4,
        "name": "Michelada con camarones",
        "description": "Bebida preparada, con marinero, gallo y 4 camarones al rededor del tarro.",
        "price": 15,
        "status": 2,
    },
  ];

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

  getProductos() {
    this.menus.forEach(element => {
      element.showAgregar = true;
      element.showButtonsAdd = false;
      element.cantidadProducto = 0;
    });

    return this.menus;

    // const url = this.auth.validApi.url + EndPoint.getProductos;

    // return this.http.post(url, { idenempresa: this.userService.apikeyEmpresa.idenEmpresa, pagina: 1 }, this.headersPost).pipe(
    //   map((resp: any) => {
    //     const respProds = resp;
    //     this.productos = respProds.datos;

    //     this.productos.forEach(element => {
    //       element.showAgregar = true;
    //       element.showButtonsAdd = false;
    //       element.cantidadProducto = 0;
    //     });
    //   }), catchError((err) => {
    //     return this.errorService.handleError(err);
    //   })
    // );
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
}
