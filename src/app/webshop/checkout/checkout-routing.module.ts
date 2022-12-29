import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import {IsAuthenticatedGuard} from "../../_guard/is-authenticated.guard";
import {CustomerAddressesComponent} from "./customer-addresses/customer-addresses.component";
import { PayComponent } from './pay/pay.component';

const routes: Routes = [
  {
    path: "address",
    component: CustomerAddressesComponent
  },
  {
    path: "pay",
    component: PayComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class CheckoutRoutingModule { }
