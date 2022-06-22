import { Component, Input, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { ModalController } from '@ionic/angular';
import { UiService } from '../../services/shared/UI/ui.service';
import { IUserParams, IUserEdit } from '../../core/interfaces/user.interface';

@Component({
  selector: 'app-create-user-modal',
  templateUrl: './create-user-modal.page.html',
  styleUrls: ['./create-user-modal.page.scss'],
})
export class CreateUserModalPage implements OnInit {

  @Input() user: any;
  @Input() idUser: any;

  selectOptions = {
    header: 'Roles',
    subHeader: 'Selecciona el rol del usuario'
  };

  arrRoles : any[] = [
    {
      name: 'Admin',
      id_rol: 1
    },
    {
        name: 'Operativo',
        id_rol: 2
    }
  ]

  isRefresh = false;
  editUser = false;
  frmUser: FormGroup;

  constructor(private modalCtrl: ModalController, private fb: FormBuilder, private uiServece: UiService) { }

  ngOnInit() {
    this.createFrmUser();
    this.detecAction();
  }

  close() {
    this.modalCtrl.dismiss({ refresh: this.isRefresh });
  }

  createFrmUser() {
    this.frmUser = this.fb.group({
      first_name : ['', [Validators.required]],
      last_name  : ['', [Validators.required]],
      email      : ['', [Validators.required, Validators.pattern('[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,5}$')]],
      password   : ['', [Validators.required]],
      id_rol      : ['', [Validators.required]],
    });
  }

  detecAction() {
    if (this.user) {
      this.editUser = true;
      this.frmUser.setValue({
        first_name : this.user.first_name,
        last_name  : this.user.last_name,
        email      : this.user.email,
        password   : '',
        id_rol     : this.user.id_rol,
      });
    }
  }

  validUser(field: string) {
    return (this.frmUser.controls[field].invalid && this.frmUser.controls[field].touched );
  }

  createUser() {
    if (this.frmUser.invalid) {
      return Object.values( this.frmUser.controls ).forEach(control => {
        control.markAsTouched();
      });
    }

    const infoUser = this.frmUser.value;

    const jsonUser: IUserParams = {
      first_name  : infoUser.first_name,
      last_name   : infoUser.last_name,
      email       : infoUser.email,
      password    : infoUser.password,
      id_rol      : infoUser.id_rol,
      user_action : this.idUser
    }

    console.log('Crear: ', jsonUser);

    const l = this.uiServece.presentLoading();
    setTimeout(() => {
      this.uiServece.presentToastSuccess('Usuario creado');
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

  sendEditUser() {
    if (this.frmUser.invalid) {
      return Object.values( this.frmUser.controls ).forEach(control => {
        control.markAsTouched();
      });
    }

    const infoUser = this.frmUser.value;

    const jsonEdit: IUserEdit = {
      id_user     : this.user.id_user,
      first_name  : infoUser.first_name,
      last_name   : infoUser.last_name,
      email       : infoUser.email,
      password    : infoUser.password,
      id_rol      : infoUser.id_rol,
      user_action : this.idUser,
    }

    console.log('Editar: ', jsonEdit);

    const l = this.uiServece.presentLoading();
    setTimeout(() => {
      this.uiServece.presentToastSuccess('Usuario editado');
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
