import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { NavController } from '@ionic/angular';
import { UiService } from '../../services/shared/UI/ui.service';
import { ILoginForm } from '../../core/interfaces/login.interface';

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage implements OnInit {

  forma: FormGroup;

  constructor(public navCtrl: NavController, private fb: FormBuilder, private uiService: UiService) { }

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

    console.log(data);

    const l = this.uiService.presentLoading();
    setTimeout(() => {
      this.uiService.dismissLoading(l);
      // this.navCtrl.navigateRoot(['/home'],{ replaceUrl: true });
    }, 1500);
  }

}
