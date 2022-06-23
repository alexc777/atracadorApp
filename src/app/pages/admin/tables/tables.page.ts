import { Component, OnInit } from '@angular/core';
import { AlertController, ModalController } from '@ionic/angular';

import { UiService } from '../../../services/shared/UI/ui.service';
import { CreateTableModalPage } from '../../../components/create-table-modal/create-table-modal.page';

@Component({
  selector: 'app-tables',
  templateUrl: './tables.page.html',
  styleUrls: ['./tables.page.scss'],
})
export class TablesPage implements OnInit {

  arrTables: any[]= [
    {
        "id_table": 1,
        "name": "Mesa #1",
        "number_table": 5,
        "capacity": 5,
        "status": 1
    },
    {
        "id_table": 2,
        "name": "Mesa #2",
        "number_table": 6,
        "capacity": 8,
        "status": 2
    },
    {
      "id_table": 3,
      "name": "Mesa #3",
      "number_table": 3,
      "capacity": 4,
      "status": 1
    },
    {
      "id_table": 4,
      "name": "Mesa #4",
      "number_table": 4,
      "capacity": 7,
      "status": 2
    },
  ]

  constructor(private modalCtrl: ModalController, private alertController: AlertController, private uiService: UiService) { }

  ngOnInit() {
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
      data.refresh ? console.log('recargar') : '';
    }
  }

  async deleteTable(table: any) {
    const alert = await this.alertController.create({
      header: 'Eliminar Usuario',
      message: `¿Estas seguro de eliminar la <strong>${table.name}</strong>?`,
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
    console.log(id_table);
    const l = this.uiService.presentLoading();
    setTimeout(() => {
      this.uiService.dismissLoading(l);
      this.uiService.presentToastInfo('Mesa eliminada');
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
