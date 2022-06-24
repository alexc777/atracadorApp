import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { SelectMenusPage } from './select-menus.page';

const routes: Routes = [
  {
    path: '',
    component: SelectMenusPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class SelectMenusPageRoutingModule {}
