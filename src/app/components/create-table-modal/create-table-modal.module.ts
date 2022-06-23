import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { CreateTableModalPageRoutingModule } from './create-table-modal-routing.module';

import { CreateTableModalPage } from './create-table-modal.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    IonicModule,
    CreateTableModalPageRoutingModule
  ],
  declarations: [CreateTableModalPage]
})
export class CreateTableModalPageModule {}
