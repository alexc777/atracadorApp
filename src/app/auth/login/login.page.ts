import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { NavController } from '@ionic/angular';
import { UiService } from '../../services/shared/UI/ui.service';
import { ILoginForm, IResponseLogin } from '../../core/interfaces/login.interface';
import { LoginService } from '../../services/auth/login.service';
import { IErrorResponse } from '../../core/interfaces/errorsResponse.interface';

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage implements OnInit {

  forma: FormGroup;

  constructor(public navCtrl: NavController, private fb: FormBuilder, private uiService: UiService, private loginService: LoginService) { }

  ngOnInit() {
    this.crearFormulario();
  }

  crearFormulario() {
    this.forma = this.fb.group({
      username    : ['', [Validators.required, Validators.pattern('[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,5}$')]],
      password : ['', [Validators.required]],
    });
  }

  login() {
    if (this.forma.invalid) {
      return this.uiService.alertInfo('Error', 'Correo y contraseña requeridos');
    }

    const data: ILoginForm = {
      email: this.forma.value.username,
      password: this.forma.value.password,
    };

    const l = this.uiService.presentLoading();
    this.loginService.login(data).subscribe((response: IResponseLogin) => {
      this.uiService.dismissLoading(l);
      if (response.data.id_rol === 1) {
        this.navCtrl.navigateRoot([`/dashboard/${response.data.id_user}`],{ replaceUrl: true, animated: true });
      } else {
        this.navCtrl.navigateRoot([`/home/${response.data.id_user}`],{ replaceUrl: true, animated: true });
      }
    }, (error: IErrorResponse) => {
      this.uiService.dismissLoading(l);
      this.uiService.alertInfo('Error', error.errorDescription);
    });
  }

}
