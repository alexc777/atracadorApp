import { Component, OnInit } from '@angular/core';
import { ModalController } from '@ionic/angular';
import { CreateUserModalPage } from '../../../components/create-user-modal/create-user-modal.page';

@Component({
  selector: 'app-users',
  templateUrl: './users.page.html',
  styleUrls: ['./users.page.scss'],
})
export class UsersPage implements OnInit {

  arrUsers: any[] = [
    {
      id_user: 1,
      first_name: 'Admin',
      last_name: 'Atracador',
      email: 'admin@elatracador.com',
      id_rol: 1
    },
    {
      id_user: 2,
      first_name: 'Jorge',
      last_name: 'Oliva',
      email: 'joliva@elatracador.com',
      id_rol: 1
    },
    {
      id_user: 3,
      first_name: 'Sara',
      last_name: 'Valencia',
      email: 'svalencia@elatracador.com',
      id_rol: 2
    }
  ];

  constructor(private modalCtrl: ModalController) { }

  ngOnInit() {
  }

  async showCreate(user?: any) {
    const modal = await this.modalCtrl.create({
      component: CreateUserModalPage,
      breakpoints: [0, 0.8, 0.9, 1],
      initialBreakpoint: 0.9,
      cssClass: 'radius-modal',
      componentProps: {
        user: user,
        idUser: 1
      },
    });
    await modal.present();

    modal.onDidDismiss().then((data: any) => {
      console.log(data);
      // if (data.data.refresh) {
      //   console.log('recargar');
      //   // this.getListClients();
      // }
    });
  }

}
