import { Component, OnInit } from '@angular/core';
import { UiService } from '../../../services/shared/UI/ui.service';
import { TablesService } from '../../../services/tables/tables.service';
import { IErrorResponse } from '../../../core/interfaces/errorsResponse.interface';
import { IListTables } from '../../../core/interfaces/table.inteface';

@Component({
  selector: 'app-tables-list',
  templateUrl: './tables-list.page.html',
  styleUrls: ['./tables-list.page.scss'],
})
export class TablesListPage implements OnInit {

  arrTables: IListTables[]= []

  constructor(private uiService: UiService, private tableService: TablesService) { }

  ngOnInit() {
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

}
