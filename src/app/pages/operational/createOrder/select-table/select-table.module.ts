import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { SelectTablePageRoutingModule } from './select-table-routing.module';

import { SelectTablePage } from './select-table.page';
import { ComponentsModule } from '../../../../components/components.module';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    SelectTablePageRoutingModule,
    ComponentsModule
  ],
  declarations: [SelectTablePage]
})
export class SelectTablePageModule {}
