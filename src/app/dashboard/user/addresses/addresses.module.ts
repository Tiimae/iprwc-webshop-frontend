import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AddressesRoutingModule } from './addresses-routing.module';
import {CreateAddresComponent} from "./create-addres/create-addres.component";
import {FormsModule, ReactiveFormsModule} from "@angular/forms";
import { AllAddressesComponent } from './all-addresses/all-addresses.component';
import {CheckoutModule} from "../../../webshop/checkout/checkout.module";
import { UpdateAddressComponent } from './update-address/update-address.component';


@NgModule({
  declarations: [
    CreateAddresComponent,
    AllAddressesComponent,
    UpdateAddressComponent
  ],
  imports: [
    CommonModule,
    AddressesRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    CheckoutModule
  ]
})
export class AddressesModule { }
