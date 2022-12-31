import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AddressesRoutingModule } from './addresses-routing.module';
import {CreateAddresComponent} from "./create-addres/create-addres.component";
import {FormsModule, ReactiveFormsModule} from "@angular/forms";


@NgModule({
  declarations: [
    // CreateAddresComponent
    CreateAddresComponent
  ],
  imports: [
    CommonModule,
    AddressesRoutingModule,
    FormsModule,
    ReactiveFormsModule
  ]
})
export class AddressesModule { }
