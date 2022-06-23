import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { TablesPageRoutingModule } from './tables-routing.module';

import { TablesPage } from './tables.page';
import { ComponentsModule } from '../../../components/components.module';
import { CreateTableModalPage } from '../../../components/create-table-modal/create-table-modal.page';
import { CreateTableModalPageModule } from '../../../components/create-table-modal/create-table-modal.module';

@NgModule({
  entryComponents: [
    CreateTableModalPage
  ],
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    TablesPageRoutingModule,
    ComponentsModule,
    CreateTableModalPageModule
  ],
  declarations: [TablesPage]
})
export class TablesPageModule {}
