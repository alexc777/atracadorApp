import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { MenusListPage } from './menus-list.page';

const routes: Routes = [
  {
    path: '',
    component: MenusListPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class MenusListPageRoutingModule {}
