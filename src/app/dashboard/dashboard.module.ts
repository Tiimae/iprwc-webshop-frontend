import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { DashboardRoutingModule } from './dashboard-routing.module';
import { SidebarComponent } from './sidebar/sidebar.component';
import { FontAwesomeModule } from "@fortawesome/angular-fontawesome";
import { FormsModule } from "@angular/forms";
import {UserModule} from "./user/user.module";
import {AdminModule} from "./admin/admin.module";
import {UserComponent} from "./user/user.component";
import {AdminComponent} from "./admin/admin.component";


@NgModule({
  declarations: [
    SidebarComponent,
    UserComponent,
    AdminComponent
  ],
  exports: [
    SidebarComponent
  ],
  imports: [
    CommonModule,
    DashboardRoutingModule,
    FontAwesomeModule,
    FormsModule,
    UserModule,
    AdminModule
  ]
})

export class DashboardModule { }
