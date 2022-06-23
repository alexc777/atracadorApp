import { Component, Input, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { ModalController } from '@ionic/angular';

import { UiService } from '../../services/shared/UI/ui.service';
import { IParamsTable, IParamsEditTable } from '../../core/interfaces/table.inteface';

@Component({
  selector: 'app-create-table-modal',
  templateUrl: './create-table-modal.page.html',
  styleUrls: ['./create-table-modal.page.scss'],
})
export class CreateTableModalPage implements OnInit {

  @Input() table: any;
  @Input() idUser: any;

  isRefresh = false;
  editTable = false;
  frmTable: FormGroup;

  constructor(private modalCtrl: ModalController, private fb: FormBuilder, private uiServece: UiService) { }

  ngOnInit() {
    this.createFrmTable();
    this.detecAction();
  }

  close() {
    this.modalCtrl.dismiss({ refresh: this.isRefresh });
  }

  createFrmTable() {
    this.frmTable = this.fb.group({
      name          : ['', [Validators.required]],
      number_table  : ['', [Validators.required]],
      capacity      : ['', [Validators.required]],
    });
  }

  detecAction() {
    if (this.table) {
      this.editTable = true;
      this.frmTable.setValue({
        name          : this.table.name,
        number_table  : this.table.number_table,
        capacity      : this.table.capacity,
      });
    }
  }

  validUser(field: string) {
    return (this.frmTable.controls[field].invalid && this.frmTable.controls[field].touched );
  }

  createTable() {
    if (this.frmTable.invalid) {
      return Object.values( this.frmTable.controls ).forEach(control => {
        control.markAsTouched();
      });
    }

    const infoTable = this.frmTable.value;

    const jsonTable: IParamsTable = {
      user_action: this.idUser,
      name: infoTable.name,
      number_table: infoTable.number_table,
      capacity: infoTable.capacity
    }

    console.log('Crear: ', jsonTable);

    const l = this.uiServece.presentLoading();
    setTimeout(() => {
      this.uiServece.presentToastSuccess('Mesa Creada');
      this.uiServece.dismissLoading(l);
      this.isRefresh = true;
      this.close();
    }, 1000);

    // this.userService.createUser(jsonUser).subscribe(() => {
    //   this.uiServece.presentToastSuccess('Usuario creado');
    //   this.uiServece.dismissLoading(l);
    //   this.isRefresh = true;
    //   this.close();
    // },(error: any) => {
    //   this.uiServece.dismissLoading(l);
    //   if (!this.uiServece.presentAlert) {
    //     this.uiServece.presentAlert = true;
    //     this.uiServece.alertInfo('Error', error.errorDescription);
    //     this.uiServece.logout(error.errorDescription);
    //   }
    // });
  }

  sendEditTable() {
    if (this.frmTable.invalid) {
      return Object.values( this.frmTable.controls ).forEach(control => {
        control.markAsTouched();
      });
    }

    const infoTable = this.frmTable.value;

    const jsonEdit: IParamsEditTable = {
      user_action: this.idUser,
      name: infoTable.name,
      number_table: infoTable.number_table,
      capacity: infoTable.capacity,
      id_table: this.table.id_table
    }

    console.log('Editar: ', jsonEdit);

    const l = this.uiServece.presentLoading();
    setTimeout(() => {
      this.uiServece.presentToastSuccess('Mesa Editada');
      this.uiServece.dismissLoading(l);
      this.isRefresh = true;
      this.close();
    }, 1000);

    // const l = this.uiServece.presentLoading();
    // this.userService.editUser(jsonEdit).subscribe(() => {
    //   this.uiServece.presentToastSuccess('Usuario editado');
    //   this.uiServece.dismissLoading(l);
    //   this.isRefresh = true;
    //   this.close();
    // },(error: any) => {
    //   this.uiServece.dismissLoading(l);
    //   if (!this.uiServece.presentAlert) {
    //     this.uiServece.presentAlert = true;
    //     this.uiServece.alertInfo('Error', error.errorDescription);
    //     this.uiServece.logout(error.errorDescription);
    //   }
    // })

  }

}
