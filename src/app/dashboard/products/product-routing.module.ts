import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import {AllProductsComponent} from "./all-products/all-products.component";
import {CreateProductComponent} from "./create-product/create-product.component";

const routes: Routes = [
  { path: "", component: AllProductsComponent },
  { path: "create",  component: CreateProductComponent }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ProductRoutingModule { }
