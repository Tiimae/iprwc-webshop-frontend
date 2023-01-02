import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import {CreateAddresComponent} from "./create-addres/create-addres.component";
import {AllAddressesComponent} from "./all-addresses/all-addresses.component";
import {UpdateAddressComponent} from "./update-address/update-address.component";

const routes: Routes = [
  {
    path: "",
    component: AllAddressesComponent
  },
  {
    path: "create",
    component: CreateAddresComponent
  },
  {
    path: ":addressId",
    component: UpdateAddressComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AddressesRoutingModule { }
