import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { NavController } from '@ionic/angular';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.page.html',
  styleUrls: ['./dashboard.page.scss'],
})
export class DashboardPage implements OnInit {

  public id_action: any;

  constructor(private router: Router, public navCtrl: NavController, private routerP: ActivatedRoute) { }

  ngOnInit() {
    this.routerP.params.subscribe(params => {
      this.id_action = params.id;
    });
  }

  goTo(route: string) {
    this.router.navigate([`${route}/${this.id_action}`]);
  }

  logout() {
    this.navCtrl.navigateRoot(['/login'],{ replaceUrl: true, animated: true });
  }

}
