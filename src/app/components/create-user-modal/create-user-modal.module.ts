import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { CreateUserModalPageRoutingModule } from './create-user-modal-routing.module';

import { CreateUserModalPage } from './create-user-modal.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    IonicModule,
    CreateUserModalPageRoutingModule
  ],
  declarations: [CreateUserModalPage]
})
export class CreateUserModalPageModule {}
