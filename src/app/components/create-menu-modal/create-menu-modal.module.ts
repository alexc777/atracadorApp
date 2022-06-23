import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { CreateMenuModalPageRoutingModule } from './create-menu-modal-routing.module';

import { CreateMenuModalPage } from './create-menu-modal.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    IonicModule,
    CreateMenuModalPageRoutingModule
  ],
  declarations: [CreateMenuModalPage]
})
export class CreateMenuModalPageModule {}
