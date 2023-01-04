import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';

import {UserRoutingModule} from './user-routing.module';
import {AccountComponent} from "./account/account.component";
import {InvoicesComponent} from "./invoices/invoices.component";
import {OrdersComponent} from "./orders/orders.component";
import {FormsModule, ReactiveFormsModule} from "@angular/forms";
import {AddressesModule} from "./addresses/addresses.module";


@NgModule({
  declarations: [
    AccountComponent,
    InvoicesComponent,
    OrdersComponent,
  ],
  imports: [
    CommonModule,
    UserRoutingModule,
    AddressesModule,
    FormsModule,
    ReactiveFormsModule
  ]
})
export class UserModule { }
