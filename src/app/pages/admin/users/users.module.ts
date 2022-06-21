import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { UsersPageRoutingModule } from './users-routing.module';

import { UsersPage } from './users.page';
import { ComponentsModule } from '../../../components/components.module';
import { CreateUserModalPage } from '../../../components/create-user-modal/create-user-modal.page';
import { CreateUserModalPageModule } from '../../../components/create-user-modal/create-user-modal.module';

@NgModule({
  entryComponents: [
    CreateUserModalPage
  ],
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    UsersPageRoutingModule,
    ComponentsModule,
    CreateUserModalPageModule
  ],
  declarations: [UsersPage]
})
export class UsersPageModule {}
