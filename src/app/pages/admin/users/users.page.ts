import { Component, OnInit } from '@angular/core';
import { ModalController, AlertController } from '@ionic/angular';
import { CreateUserModalPage } from '../../../components/create-user-modal/create-user-modal.page';
import { UiService } from '../../../services/shared/UI/ui.service';

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

  constructor(private modalCtrl: ModalController, private alertController: AlertController, private uiService: UiService) { }

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

    const { data } = await modal.onDidDismiss();
    if (data) {
      data.refresh ? console.log('recargar') : '';
    }
  }

  async deleteUser(user: any) {
    const alert = await this.alertController.create({
      header: 'Eliminar Usuario',
      message: `¿Estas seguro de eliminar al usuario <strong>${user.first_name} ${user.last_name}</strong>?`,
      buttons: [
        {
          text: 'Cancelar',
          role: 'cancel',
          handler: () => {}
        },
        {
          text: 'Eliminar usuario',
          handler: () => {
            this.confirmDetele(user.id_user);
          }
        }
      ]
    });

    await alert.present();
  }

  confirmDetele(id_user: any) {
    console.log(id_user);
    const l = this.uiService.presentLoading();
    setTimeout(() => {
      this.uiService.dismissLoading(l);
      this.uiService.presentToastInfo('Usuario eliminado');
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
