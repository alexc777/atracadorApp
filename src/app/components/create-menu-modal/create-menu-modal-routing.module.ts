import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { CreateMenuModalPage } from './create-menu-modal.page';

const routes: Routes = [
  {
    path: '',
    component: CreateMenuModalPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class CreateMenuModalPageRoutingModule {}
