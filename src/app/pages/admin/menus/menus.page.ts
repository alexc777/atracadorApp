import { Component, OnInit } from '@angular/core';
import { UiService } from '../../../services/shared/UI/ui.service';
import { AlertController, ModalController } from '@ionic/angular';
import { CreateMenuModalPage } from '../../../components/create-menu-modal/create-menu-modal.page';
import { MenusService } from '../../../services/menus/menus.service';
import { IListMenu } from '../../../core/interfaces/menu.interface';
import { IErrorResponse } from '../../../core/interfaces/errorsResponse.interface';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-menus',
  templateUrl: './menus.page.html',
  styleUrls: ['./menus.page.scss'],
})
export class MenusPage implements OnInit {

  public id_action: any;
  arrMenus:any[] = []

  constructor(private modalCtrl: ModalController, private alertController: AlertController, private uiService: UiService,
              private menuService: MenusService, private routerP: ActivatedRoute) { }

  ngOnInit() {
    this.routerP.params.subscribe(params => {
      this.id_action = params.id;
    });

    this.getMenus();
  }

  getMenus() {
    const l = this.uiService.presentLoading();
    this.menuService.getMenus().subscribe((response: IListMenu[]) => {
      this.uiService.dismissLoading(l);
      this.arrMenus = response;
    }, (error: IErrorResponse) => {
      this.uiService.dismissLoading(l);
      this.uiService.alertInfo('Error', error.errorDescription);
    });
  }

  async showCreate(menu?: any) {
    const modal = await this.modalCtrl.create({
      component: CreateMenuModalPage,
      breakpoints: [0, 0.8, 0.9, 1],
      initialBreakpoint: 0.9,
      cssClass: 'radius-modal',
      componentProps: {
        menu: menu,
        idUser: this.id_action
      },
    });
    await modal.present();

    const { data } = await modal.onDidDismiss();
    if (data) {
      data.refresh ? this.getMenus() : '';
    }
  }

  async deleteMenu(menu: any) {
    const alert = await this.alertController.create({
      header: 'Eliminar Menú',
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
    const l = this.uiService.presentLoading();
    this.menuService.deleteMenu({ id_menu, user_action: this.id_action }).subscribe(() => {
      this.uiService.dismissLoading(l);
      this.uiService.presentToastInfo('Menú eliminado');
      this.getMenus();
    }, (error: IErrorResponse) => {
        this.uiService.dismissLoading(l);
        if (!this.uiService.presentAlert) {
          this.uiService.presentAlert = true;
          this.uiService.alertInfo('Error al eliminar menú', error.errorDescription);
        }
    });
  }

}
