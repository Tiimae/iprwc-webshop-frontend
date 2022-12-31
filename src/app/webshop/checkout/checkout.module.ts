import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';
import { PayComponent } from './pay/pay.component';
import { UserAddressComponent } from './pay/user-address/user-address.component';
import {CartComponent} from "../cart/cart.component";
import {CartModule} from "../cart/cart.module";



@NgModule({
  declarations: [
    PayComponent,
    UserAddressComponent,
  ],
  imports: [
    CommonModule,
    ReactiveFormsModule,
    CartModule
  ]
})
export class CheckoutModule { }
