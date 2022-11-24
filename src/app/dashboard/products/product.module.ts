import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ProductRoutingModule } from './product-routing.module';
import { AllProductsComponent } from './all-products/all-products.component';
import { ProductComponent } from './all-products/product/product.component';


@NgModule({
  declarations: [
    AllProductsComponent,
    ProductComponent
  ],
  imports: [
    CommonModule,
    ProductRoutingModule
  ]
})
export class ProductModule { }
