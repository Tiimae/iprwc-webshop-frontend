import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {CustomerAddressesComponent} from "./customer-addresses/customer-addresses.component";
import { ReactiveFormsModule } from '@angular/forms';
import { PayComponent } from './pay/pay.component';
import { UserAddressComponent } from './pay/user-address/user-address.component';



@NgModule({
  declarations: [
    CustomerAddressesComponent,
    PayComponent,
    UserAddressComponent
  ],
  imports: [
    CommonModule,
    ReactiveFormsModule
  ]
})
export class CheckoutModule { }
