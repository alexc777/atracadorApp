import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { TablesListPage } from './tables-list.page';

const routes: Routes = [
  {
    path: '',
    component: TablesListPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class TablesListPageRoutingModule {}
