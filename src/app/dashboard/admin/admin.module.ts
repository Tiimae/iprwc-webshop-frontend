import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';

import {AdminRoutingModule} from './admin-routing.module';
import {SuppliersModule} from "./suppliers/suppliers.module";
import {UsersModule} from "./users/users.module";
import {ProductModule} from "./products/product.module";
import {CategoriesModule} from "./categories/categories.module";
import {BrandModule} from "./brands/brand.module";


@NgModule({
  declarations: [
  ],
  imports: [
    CommonModule,
    AdminRoutingModule,
    UsersModule,
    SuppliersModule,
    ProductModule,
    CategoriesModule,
    BrandModule
  ]
})
export class AdminModule { }
