import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';

import {ProductRoutingModule} from './product-routing.module';
import {AllProductsComponent} from './all-products/all-products.component';
import {ProductComponent} from './all-products/product/product.component';
import {CreateProductComponent} from './create-product/create-product.component';
import { ReactiveFormsModule } from '@angular/forms';
import {SharedModule} from "../../../_shared/shared.module";
import { UpdateProductComponent } from './update-product/update-product.component';


@NgModule({
  declarations: [
    AllProductsComponent,
    ProductComponent,
    CreateProductComponent,
    UpdateProductComponent
  ],
  imports: [
    CommonModule,
    ProductRoutingModule,
    ReactiveFormsModule,
    SharedModule
  ]
})
export class ProductModule { }
