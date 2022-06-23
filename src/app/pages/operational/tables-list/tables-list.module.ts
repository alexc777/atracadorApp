import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { TablesListPageRoutingModule } from './tables-list-routing.module';

import { TablesListPage } from './tables-list.page';
import { ComponentsModule } from '../../../components/components.module';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    TablesListPageRoutingModule,
    ComponentsModule
  ],
  declarations: [TablesListPage]
})
export class TablesListPageModule {}
