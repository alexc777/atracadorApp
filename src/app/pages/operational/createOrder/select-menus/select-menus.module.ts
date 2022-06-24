import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { SelectMenusPageRoutingModule } from './select-menus-routing.module';

import { SelectMenusPage } from './select-menus.page';
import { ComponentsModule } from '../../../../components/components.module';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    SelectMenusPageRoutingModule,
    ComponentsModule
  ],
  declarations: [SelectMenusPage]
})
export class SelectMenusPageModule {}
