import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { CreateTableModalPage } from './create-table-modal.page';

const routes: Routes = [
  {
    path: '',
    component: CreateTableModalPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class CreateTableModalPageRoutingModule {}
