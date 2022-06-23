import { Component, OnInit } from '@angular/core';
import { NavController } from '@ionic/angular';
import { Router } from '@angular/router';

@Component({
  selector: 'app-home',
  templateUrl: './home.page.html',
  styleUrls: ['./home.page.scss'],
})
export class HomePage implements OnInit {

  constructor(private router: Router, public navCtrl: NavController) { }

  ngOnInit() {
  }

  goTo(route: string) {
    this.router.navigate([`${route}`]);
  }

  logout() {
    this.navCtrl.navigateRoot(['/login'],{ replaceUrl: true, animated: true });
  }

}
