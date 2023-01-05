import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';

import {UserRoutingModule} from './user-routing.module';
import {AccountComponent} from "./account/account.component";
import {InvoicesComponent} from "./invoices/invoices.component";
import {FormsModule, ReactiveFormsModule} from "@angular/forms";
import {AddressesModule} from "./addresses/addresses.module";
import {OrdersModule} from "./orders/orders.module";


@NgModule({
  declarations: [
    AccountComponent,
    InvoicesComponent,
  ],
  imports: [
    CommonModule,
    UserRoutingModule,
    AddressesModule,
    FormsModule,
    OrdersModule,
    ReactiveFormsModule
})
export class UserModule { }
