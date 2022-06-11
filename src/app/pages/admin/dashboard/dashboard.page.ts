import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { NavController } from '@ionic/angular';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.page.html',
  styleUrls: ['./dashboard.page.scss'],
})
export class DashboardPage implements OnInit {

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
