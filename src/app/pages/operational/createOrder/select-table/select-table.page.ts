import { Component, OnInit } from '@angular/core';
import { NavigationExtras, Router, ActivatedRoute } from '@angular/router';
import { UiService } from '../../../../services/shared/UI/ui.service';
import { TablesService } from '../../../../services/tables/tables.service';
import { IListTables } from '../../../../core/interfaces/table.inteface';
import { IErrorResponse } from '../../../../core/interfaces/errorsResponse.interface';

@Component({
  selector: 'app-select-table',
  templateUrl: './select-table.page.html',
  styleUrls: ['./select-table.page.scss'],
})
export class SelectTablePage implements OnInit {

  public id_action: any;
  arrTables: IListTables[]= [];

  constructor(private routerNav: Router, private uiService: UiService, private routerP: ActivatedRoute, private tableService: TablesService) { }

  ngOnInit() {
    this.routerP.params.subscribe(params => {
      this.id_action = params.id;
    });

    this.getTables();
  }

  getTables() {
    const l = this.uiService.presentLoading();
    this.tableService.getTables().subscribe((response: IListTables[]) => {
      this.uiService.dismissLoading(l);
      this.arrTables = response;
    }, (error: IErrorResponse) => {
      this.uiService.dismissLoading(l);
      this.uiService.alertInfo('Error', error.errorDescription);
    });
  }

  selectTable(table:any) {
    if (table.status === 2) {
      return this.uiService.alertInfo('Aviso', 'Esta mesa no esta disponible');
    }

    const navigationExtras: NavigationExtras = { queryParams: {datosOrder: JSON.stringify(table)} };
    this.routerNav.navigate([`select-menus/${this.id_action}`], navigationExtras);
  }

}
