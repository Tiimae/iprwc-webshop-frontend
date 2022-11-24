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


@NgModule({
  declarations: [
    UsersComponent,
    AllUsersComponent,
    UserComponent,
    UserRolesComponent,
    UserEmailComponent,
    UpdateUserComponent,
    CreateUserComponent
  ],
  imports: [
    CommonModule,
    UsersRoutingModule
  ]
})
export class UsersModule { }
