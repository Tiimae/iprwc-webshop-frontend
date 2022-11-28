import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { UsersRoutingModule } from './users-routing.module';
import { UsersComponent } from './users.component';
import { AllUsersComponent } from './all-users/all-users.component';
import { UserComponent } from './all-users/user/user.component';
import { UserRolesComponent } from './all-users/user/user-roles/user-roles.component';
import { UserEmailComponent } from './all-users/user/user-email/user-email.component';
import { UpdateUserComponent } from './update-user/update-user.component';
import { CreateUserComponent } from './create-user/create-user.component';
import {FormsModule} from "@angular/forms";
import { UpdateUserRolesComponent } from './update-user/update-user-roles/update-user-roles.component';
import { CreateUserRolesComponent } from './create-user/create-user-roles/create-user-roles.component';


@NgModule({
  declarations: [
    UsersComponent,
    AllUsersComponent,
    UserComponent,
    UserRolesComponent,
    UserEmailComponent,
    UpdateUserComponent,
    CreateUserComponent,
    UpdateUserRolesComponent,
    CreateUserRolesComponent,

  ],
  imports: [
    CommonModule,
    UsersRoutingModule,
    FormsModule
  ]
})
export class UsersModule { }
