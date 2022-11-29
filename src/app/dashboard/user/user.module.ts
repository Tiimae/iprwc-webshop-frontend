import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { UserRoutingModule } from './user-routing.module';
import { UserComponent } from './user.component';
import {AccountComponent} from "./account/account.component";
import {AddressesComponent} from "./addresses/addresses.component";
import {InvoicesComponent} from "./invoices/invoices.component";
import {OrdersComponent} from "./orders/orders.component";
import {FormsModule} from "@angular/forms";


@NgModule({
  declarations: [
    AccountComponent,
    AddressesComponent,
    InvoicesComponent,
    OrdersComponent
  ],
  imports: [
    CommonModule,
    UserRoutingModule,
    FormsModule
  ]
})
export class UserModule { }
