import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-orders',
  templateUrl: './orders.page.html',
  styleUrls: ['./orders.page.scss'],
})
export class OrdersPage implements OnInit {

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

  constructor() { }

  ngOnInit() {
  }

}
