import { Component, OnInit } from '@angular/core';
import { NavigationExtras, Router } from '@angular/router';
import { UiService } from '../../../../services/shared/UI/ui.service';

@Component({
  selector: 'app-select-table',
  templateUrl: './select-table.page.html',
  styleUrls: ['./select-table.page.scss'],
})
export class SelectTablePage implements OnInit {

  arrTables: any[]= [
    {
        "id_table": 1,
        "name": "Mesa #1",
        "number_table": 5,
        "capacity": 5,
        "status": 1
    },
    {
        "id_table": 2,
        "name": "Mesa #2",
        "number_table": 6,
        "capacity": 8,
        "status": 2
    },
    {
      "id_table": 3,
      "name": "Mesa #3",
      "number_table": 3,
      "capacity": 4,
      "status": 1
    },
    {
      "id_table": 4,
      "name": "Mesa #4",
      "number_table": 4,
      "capacity": 7,
      "status": 2
    },
  ];

  constructor(private routerNav: Router, private uiService: UiService) { }

  ngOnInit() {
  }

  selectTable(table:any) {
    if (table.status === 2) {
      return this.uiService.alertInfo('Aviso', 'Esta mesa no esta disponible');
    }

    const navigationExtras: NavigationExtras = { queryParams: {datosOrder: JSON.stringify(table)} };
    this.routerNav.navigate(['select-menus'], navigationExtras);
  }

}
