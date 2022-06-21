import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { CreateUserModalPage } from './create-user-modal.page';

const routes: Routes = [
  {
    path: '',
    component: CreateUserModalPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class CreateUserModalPageRoutingModule {}
