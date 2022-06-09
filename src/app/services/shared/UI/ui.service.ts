import { Injectable } from '@angular/core';
import { AlertController, LoadingController, ToastController } from '@ionic/angular';

@Injectable({
  providedIn: 'root'
})
export class UiService {

  presentAlert = false;

  constructor(private alertController: AlertController, private loadingController: LoadingController,
              private toastController: ToastController) { }

  async presentLoading() {
    const loading = this.loadingController.create({message: ''});
    await (await loading).present();
    return loading;
  }

  async presentLoadingText(text: string) {
    const loading = this.loadingController.create({message: text});
    await (await loading).present();
    return loading;
  }

  async dismissLoading(loading: any) {
    const lDismiss = await loading;
    lDismiss.dismiss();
  }

  async alertInfo(header: string, message: string) {
    const alert = await this.alertController.create({
        header,
        message,
        backdropDismiss: false,
        buttons: [{text: 'Ok', handler: () => { this.presentAlert = false; }}]
    });

    await alert.present();
  }

  async presentToastSuccess(message: string) {
    const toast = await this.toastController.create({
        message,
        duration: 1000,
        position: 'bottom',
        cssClass: 'toast-success'
    });

    toast.present();
  }

  async presentToastDanger(message: string) {
    const toast = await this.toastController.create({
        message,
        duration: 1000,
        position: 'bottom',
        cssClass: 'toast-danger'
    });

    toast.present();
  }

  async presentToastInfo(message: string) {
    const toast = await this.toastController.create({
        message,
        duration: 1000,
        position: 'bottom',
        cssClass: 'toast-info'
    });

    toast.present();
  }

}
