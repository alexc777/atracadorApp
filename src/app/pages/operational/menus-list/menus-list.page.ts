import { Component, OnInit } from '@angular/core';
import { ActionSheetController } from '@ionic/angular';
import { UiService } from '../../../services/shared/UI/ui.service';
import { MenusService } from '../../../services/menus/menus.service';
import { IListMenu, IEditMenu } from '../../../core/interfaces/menu.interface';
import { IErrorResponse } from '../../../core/interfaces/errorsResponse.interface';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-menus-list',
  templateUrl: './menus-list.page.html',
  styleUrls: ['./menus-list.page.scss'],
})
export class MenusListPage implements OnInit {

  public id_action: any;
  arrMenus:IListMenu[] = []

  constructor(private actionSheetController: ActionSheetController, private uiService: UiService, private menuService: MenusService,
              private routerP: ActivatedRoute) { }

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

  async changeState(menu: any) {
    const actionSheet = await this.actionSheetController.create({
      header: 'Cambiar Estado',
      buttons: [
        {
          text: 'Menú Agotado',
          role: 'destructive',
          handler: () => {
            this.editStatus(menu, 2)
          }
        },
        {
          text: 'Menú Disponible',
          handler: () => {
            this.editStatus(menu, 1)
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

  editStatus(menu: any, status: number) {
    const jsonEdit: IEditMenu = {
      user_action: this.id_action,
      name: menu.name,
      description: menu.description,
      price: menu.price,
      id_menu: menu.id_menu,
      status: status
    }

    const l = this.uiService.presentLoading();
    this.menuService.editMenu(jsonEdit).subscribe(() => {
      this.uiService.presentToastSuccess('Menú Editado');
      this.uiService.dismissLoading(l);
      this.getMenus();
    },(error: any) => {
      this.uiService.dismissLoading(l);
      if (!this.uiService.presentAlert) {
        this.uiService.presentAlert = true;
        this.uiService.alertInfo('Error', error.errorDescription);
      }
    })
  }

}
