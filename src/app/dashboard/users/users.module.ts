import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { UsersRoutingModule } from './users-routing.module';
import { UsersComponent } from './users.component';
import { AllUsersComponent } from './all-users/all-users.component';
import { UserComponent } from './all-users/user/user.component';
import { UserRolesComponent } from './all-users/user/user-roles/user-roles.component';
import { UserEmailComponent } from './all-users/user/user-email/user-email.component';


@NgModule({
  declarations: [
    UsersComponent,
    AllUsersComponent,
    UserComponent,
    UserRolesComponent,
    UserEmailComponent
  ],
  imports: [
    CommonModule,
    UsersRoutingModule
  ]
})
export class UsersModule { }
