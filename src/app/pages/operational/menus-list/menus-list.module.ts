import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { MenusListPageRoutingModule } from './menus-list-routing.module';

import { MenusListPage } from './menus-list.page';
import { ComponentsModule } from '../../../components/components.module';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    MenusListPageRoutingModule,
    ComponentsModule
  ],
  declarations: [MenusListPage]
})
export class MenusListPageModule {}
