import { Component, OnInit } from '@angular/core';
import { UiService } from '../../../services/shared/UI/ui.service';
import { AlertController, ModalController } from '@ionic/angular';
import { CreateMenuModalPage } from '../../../components/create-menu-modal/create-menu-modal.page';

@Component({
  selector: 'app-menus',
  templateUrl: './menus.page.html',
  styleUrls: ['./menus.page.scss'],
})
export class MenusPage implements OnInit {

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

  constructor(private modalCtrl: ModalController, private alertController: AlertController, private uiService: UiService) { }

  ngOnInit() {
  }

  async showCreate(menu?: any) {
    const modal = await this.modalCtrl.create({
      component: CreateMenuModalPage,
      breakpoints: [0, 0.8, 0.9, 1],
      initialBreakpoint: 0.9,
      cssClass: 'radius-modal',
      componentProps: {
        menu: menu,
        idUser: 1
      },
    });
    await modal.present();

    const { data } = await modal.onDidDismiss();
    if (data) {
      data.refresh ? console.log('recargar') : '';
    }
  }

  async deleteMenu(menu: any) {
    const alert = await this.alertController.create({
      header: 'Eliminar Usuario',
      message: `¿Estas seguro de eliminar el menú <strong>${menu.name}</strong>?`,
      buttons: [
        {
          text: 'Cancelar',
          role: 'cancel',
          handler: () => {}
        },
        {
          text: 'Eliminar menú',
          handler: () => {
            this.confirmDetele(menu.id_menu);
          }
        }
      ]
    });

    await alert.present();
  }

  confirmDetele(id_menu: any) {
    console.log(id_menu);
    const l = this.uiService.presentLoading();
    setTimeout(() => {
      this.uiService.dismissLoading(l);
      this.uiService.presentToastInfo('Menú eliminado');
    }, 1000);

    // this.clientService.toogleStatusClient(id_user).subscribe(() => {
    //   this.uiService.dismissLoading(l);
    //   this.getListClients();
    // }, (error: IErrorResponse) => {
    //     this.uiService.dismissLoading(l);
    //     if (!this.uiService.presentAlert) {
    //       this.uiService.presentAlert = true;
    //       this.uiService.alertInfo('Error al eliminar cliente', error.errorDescription);
    //     }
    // });
  }

}
