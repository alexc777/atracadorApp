import { Component, Input, OnInit } from '@angular/core';
import { UiService } from '../../services/shared/UI/ui.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ModalController } from '@ionic/angular';
import { IParamsMenu, IEditMenu } from '../../core/interfaces/menu.interface';
import { MenusService } from '../../services/menus/menus.service';

@Component({
  selector: 'app-create-menu-modal',
  templateUrl: './create-menu-modal.page.html',
  styleUrls: ['./create-menu-modal.page.scss'],
})
export class CreateMenuModalPage implements OnInit {

  @Input() menu: any;
  @Input() idUser: any;

  selectOptions = {
    header: 'Estado',
    subHeader: 'Selecciona el estado del menú'
  };

  arrEstado : any[] = [
    {
      name: 'Disponible',
      id: 1
    },
    {
        name: 'Agotado',
        id: 2
    }
  ]

  isRefresh = false;
  editMenu = false;
  frmMenu: FormGroup;

  constructor(private modalCtrl: ModalController, private fb: FormBuilder, private uiServece: UiService, private menuService: MenusService) { }

  ngOnInit() {
    this.createFrmMenu();
    this.detecAction();
  }

  close() {
    this.modalCtrl.dismiss({ refresh: this.isRefresh });
  }

  createFrmMenu() {
    this.frmMenu = this.fb.group({
      name         : ['', [Validators.required]],
      description  : ['', [Validators.required]],
      price        : ['', [Validators.required]],
      status       : ['',[]],
    });
  }

  detecAction() {
    if (this.menu) {
      this.editMenu = true;
      this.frmMenu.setValue({
        name        : this.menu.name,
        description : this.menu.description,
        price       : this.menu.price,
        status      : this.menu.status,
      });
    }
  }

  validUser(field: string) {
    return (this.frmMenu.controls[field].invalid && this.frmMenu.controls[field].touched );
  }

  createMenu() {
    if (this.frmMenu.invalid) {
      return Object.values( this.frmMenu.controls ).forEach(control => {
        control.markAsTouched();
      });
    }

    const infoMenu = this.frmMenu.value;

    const jsonMenu: IParamsMenu = {
      user_action: this.idUser,
      name: infoMenu.name,
      description: infoMenu.description,
      price: infoMenu.price
    }

    const l = this.uiServece.presentLoading();
    this.menuService.createMenu(jsonMenu).subscribe(() => {
      this.uiServece.presentToastSuccess('Menú Creado');
      this.uiServece.dismissLoading(l);
      this.isRefresh = true;
      this.close();
    },(error: any) => {
      this.uiServece.dismissLoading(l);
      if (!this.uiServece.presentAlert) {
        this.uiServece.presentAlert = true;
        this.uiServece.alertInfo('Error', error.errorDescription);
      }
    });
  }

  sendEditTable() {
    if (this.frmMenu.invalid) {
      return Object.values( this.frmMenu.controls ).forEach(control => {
        control.markAsTouched();
      });
    }

    const infoMenu = this.frmMenu.value;

    const jsonEdit: IEditMenu = {
      user_action: this.idUser,
      name: infoMenu.name,
      description: infoMenu.description,
      price: infoMenu.price,
      id_menu: this.menu.id_menu,
      status: infoMenu.status
    }

    const l = this.uiServece.presentLoading();
    this.menuService.editMenu(jsonEdit).subscribe(() => {
      this.uiServece.presentToastSuccess('Menú Editado');
      this.uiServece.dismissLoading(l);
      this.isRefresh = true;
      this.close();
    },(error: any) => {
      this.uiServece.dismissLoading(l);
      if (!this.uiServece.presentAlert) {
        this.uiServece.presentAlert = true;
        this.uiServece.alertInfo('Error', error.errorDescription);
      }
    })

  }

}
