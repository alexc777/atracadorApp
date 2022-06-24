import { Component, OnInit } from '@angular/core';
import { ActionSheetController } from '@ionic/angular';

@Component({
  selector: 'app-orders-list',
  templateUrl: './orders-list.page.html',
  styleUrls: ['./orders-list.page.scss'],
})
export class OrdersListPage implements OnInit {

  arrOrders: any[] = [
    {
        "id_order": 1,
        "comments": "El arroz del caldo en un plato aparte.",
        "total": 100,
        "status": 1,
        "id_table": 2,
        "detail": [
            {
                "name": "Caldo de pezcado",
                "price": 50,
                "quantity": 1,
                "sub_total": 50
            },
            {
                "name": "Mojarra frita",
                "price": 50,
                "quantity": 1,
                "sub_total": 50
            }
        ]
    },
    {
        "id_order": 5,
        "comments": "N/A",
        "total": 200,
        "status": 2,
        "id_table": 4,
        "detail": [
            {
                "name": "Camarones al ajillo",
                "price": 50,
                "quantity": 2,
                "sub_total": 50
            },
            {
                "name": "Michelada con camarones",
                "price": 50,
                "quantity": 1,
                "sub_total": 50
            }
        ]
    },
    {
      "id_order": 11,
      "comments": "Limón extra para la mojarra",
      "total": 200,
      "status": 3,
      "id_table": 3,
      "detail": [
          {
              "name": "Michelada con camarones",
              "price": 50,
              "quantity": 2,
              "sub_total": 50
          },
          {
              "name": "Mojarra frita",
              "price": 50,
              "quantity": 1,
              "sub_total": 50
          }
      ]
    },
    {
      "id_order": 13,
      "comments": "Camarones de las micheladas en un plato aparte",
      "total": 200,
      "status": 4,
      "id_table": 1,
      "detail": [
          {
              "name": "Caldo de pezcado",
              "price": 50,
              "quantity": 2,
              "sub_total": 50
          },
          {
              "name": "Michelada con camarones",
              "price": 50,
              "quantity": 1,
              "sub_total": 50
          }
      ]
    }
  ]

  constructor(private actionSheetController: ActionSheetController) { }

  ngOnInit() {
  }

  async changeState(order: any) {

    const actionSheet = await this.actionSheetController.create({
      header: 'Cambiar Estado',
      buttons: [
        {
          text: 'Orden Entregada',
          handler: () => {
            // status 2
            console.log('entregada: ', order);
          }
        },
        {
          text: 'Orden Completada',
          handler: () => {
            // status 3
            console.log('completada: ', order);
          }
        },
        {
          text: 'Orden Cancelada',
          handler: () => {
            // status 4
            console.log('cacelada: ', order);
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

}
