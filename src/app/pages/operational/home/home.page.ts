import { Component, OnInit } from '@angular/core';
import { NavController } from '@ionic/angular';
import { Router, ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-home',
  templateUrl: './home.page.html',
  styleUrls: ['./home.page.scss'],
})
export class HomePage implements OnInit {
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
