import { Component, OnInit } from '@angular/core';
import { AlertController, ModalController } from '@ionic/angular';

import { UiService } from '../../../services/shared/UI/ui.service';
import { CreateTableModalPage } from '../../../components/create-table-modal/create-table-modal.page';
import { TablesService } from '../../../services/tables/tables.service';
import { IListTables } from '../../../core/interfaces/table.inteface';
import { IErrorResponse } from '../../../core/interfaces/errorsResponse.interface';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-tables',
  templateUrl: './tables.page.html',
  styleUrls: ['./tables.page.scss'],
})
export class TablesPage implements OnInit {

  public id_action: any;

  arrTables: IListTables[]= []

  constructor(private modalCtrl: ModalController, private alertController: AlertController, private uiService: UiService,
              private tableService: TablesService, private routerP: ActivatedRoute) { }

  ngOnInit() {
    this.routerP.params.subscribe(params => {
      this.id_action = params.id;
    });

    this.getTables();
  }

  getTables() {
    const l = this.uiService.presentLoading();
    this.tableService.getTables().subscribe((response: IListTables[]) => {
      this.uiService.dismissLoading(l);
      this.arrTables = response;
    }, (error: IErrorResponse) => {
      this.uiService.dismissLoading(l);
      this.uiService.alertInfo('Error', error.errorDescription);
    });
  }

  async showCreate(table?: any) {
    const modal = await this.modalCtrl.create({
      component: CreateTableModalPage,
      breakpoints: [0, 0.8, 0.9, 1],
      initialBreakpoint: 0.9,
      cssClass: 'radius-modal',
      componentProps: {
        table: table,
        idUser: 1
      },
    });
    await modal.present();

    const { data } = await modal.onDidDismiss();
    if (data) {
      data.refresh ? this.getTables() : '';
    }
  }

  async deleteTable(table: any) {
    const alert = await this.alertController.create({
      header: 'Eliminar Mesa',
      message: `¿Estas seguro de eliminar la Mesa #<strong>${table.id_table}</strong>?`,
      buttons: [
        {
          text: 'Cancelar',
          role: 'cancel',
          handler: () => {}
        },
        {
          text: 'Eliminar mesa',
          handler: () => {
            this.confirmDetele(table.id_table);
          }
        }
      ]
    });

    await alert.present();
  }

  confirmDetele(id_table: any) {
    const l = this.uiService.presentLoading();
    this.tableService.deleteTable({ id_table, user_action: this.id_action }).subscribe(() => {
      this.uiService.dismissLoading(l);
      this.uiService.presentToastInfo('Mesa eliminada');
      this.getTables();
    }, (error: IErrorResponse) => {
        this.uiService.dismissLoading(l);
        if (!this.uiService.presentAlert) {
          this.uiService.presentAlert = true;
          this.uiService.alertInfo('Error al eliminar mesa', error.errorDescription);
        }
    });
  }

}
