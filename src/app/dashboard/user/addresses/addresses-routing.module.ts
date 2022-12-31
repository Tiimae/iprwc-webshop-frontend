import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import {CreateAddresComponent} from "./create-addres/create-addres.component";

const routes: Routes = [
  {
    path: "create",
    component: CreateAddresComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AddressesRoutingModule { }
