import { Component, OnInit } from '@angular/core';
import { ModalController, AlertController } from '@ionic/angular';
import { CreateUserModalPage } from '../../../components/create-user-modal/create-user-modal.page';
import { UiService } from '../../../services/shared/UI/ui.service';
import { UsersService } from '../../../services/users/users.service';
import { IListUsers } from '../../../core/interfaces/user.interface';
import { IErrorResponse } from '../../../core/interfaces/errorsResponse.interface';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-users',
  templateUrl: './users.page.html',
  styleUrls: ['./users.page.scss'],
})
export class UsersPage implements OnInit {

  public id_action: any;
  arrUsers: IListUsers[] = [];

  constructor(private modalCtrl: ModalController, private alertController: AlertController, private uiService: UiService,
              private userService: UsersService, private routerP: ActivatedRoute) { }

  ngOnInit() {
    this.routerP.params.subscribe(params => {
      this.id_action = params.id;
    });

    this.getUsers();
  }

  getUsers() {
    const l = this.uiService.presentLoading();
    this.userService.getUser().subscribe((response: IListUsers[]) => {
      this.uiService.dismissLoading(l);
      this.arrUsers = response;
    }, (error: IErrorResponse) => {
      this.uiService.dismissLoading(l);
      this.uiService.alertInfo('Error', error.errorDescription);
    });
  }

  async showCreate(user?: any) {
    const modal = await this.modalCtrl.create({
      component: CreateUserModalPage,
      breakpoints: [0, 0.8, 0.9, 1],
      initialBreakpoint: 0.9,
      cssClass: 'radius-modal',
      componentProps: {
        user: user,
        idUser: this.id_action
      },
    });
    await modal.present();

    const { data } = await modal.onDidDismiss();
    if (data) {
      data.refresh ? this.getUsers() : '';
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
    const l = this.uiService.presentLoading();
    this.userService.deleteUser({id_user, user_action: this.id_action}).subscribe(() => {
      this.uiService.dismissLoading(l);
      this.uiService.presentToastInfo('Usuario eliminado');
      this.getUsers();
    }, (error: IErrorResponse) => {
        this.uiService.dismissLoading(l);
        if (!this.uiService.presentAlert) {
          this.uiService.presentAlert = true;
          this.uiService.alertInfo('Error al eliminar usuario', error.errorDescription);
        }
    });
  }

}
