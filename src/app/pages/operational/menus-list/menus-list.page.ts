import { Component, OnInit } from '@angular/core';
import { ActionSheetController } from '@ionic/angular';

@Component({
  selector: 'app-menus-list',
  templateUrl: './menus-list.page.html',
  styleUrls: ['./menus-list.page.scss'],
})
export class MenusListPage implements OnInit {

  arrMenus:any[] = [
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
  ]

  constructor(private actionSheetController: ActionSheetController) { }

  ngOnInit() {
  }

  async changeState(menu: any) {
    const actionSheet = await this.actionSheetController.create({
      header: 'Cambiar Estado',
      buttons: [
        {
          text: 'Menú agotado',
          role: 'destructive',
          handler: () => {
            console.log('menu desable: ', menu);
          }
        },
        {
          text: 'Menú disponible',
          handler: () => {
            console.log('Habilitar: ', menu);
          }
        },
        {
          text: 'Cancelar',
          role: 'cancel',
          handler: () => {}
        }
      ]
    });

    await actionSheet.present();
  }

}
