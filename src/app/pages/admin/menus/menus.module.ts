import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { MenusPageRoutingModule } from './menus-routing.module';

import { MenusPage } from './menus.page';
import { ComponentsModule } from '../../../components/components.module';
import { CreateMenuModalPage } from '../../../components/create-menu-modal/create-menu-modal.page';
import { CreateMenuModalPageModule } from '../../../components/create-menu-modal/create-menu-modal.module';

@NgModule({
  entryComponents: [
    CreateMenuModalPage
  ],
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    MenusPageRoutingModule,
    ComponentsModule,
    CreateMenuModalPageModule
  ],
  declarations: [MenusPage]
})
export class MenusPageModule {}
