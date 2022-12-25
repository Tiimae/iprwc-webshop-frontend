import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {CustomerAddressesComponent} from "./customer-addresses/customer-addresses.component";
import { ReactiveFormsModule } from '@angular/forms';



@NgModule({
  declarations: [
    CustomerAddressesComponent
  ],
  imports: [
    CommonModule,
    ReactiveFormsModule
  ]
})
export class CheckoutModule { }
