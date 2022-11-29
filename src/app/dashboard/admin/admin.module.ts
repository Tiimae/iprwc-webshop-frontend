import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AdminRoutingModule } from './admin-routing.module';
import {UsersComponent} from "./users/users.component";
import {SuppliersModule} from "./suppliers/suppliers.module";
import {SuppliersComponent} from "./suppliers/suppliers.component";
import {ProductsComponent} from "./products/products.component";
import {CategoriesComponent} from "./categories/categories.component";
import {BrandsComponent} from "./brands/brands.component";
import {UsersModule} from "./users/users.module";
import {ProductModule} from "./products/product.module";
import {CategoriesModule} from "./categories/categories.module";
import {BrandModule} from "./brands/brand.module";


@NgModule({
  declarations: [
    UsersComponent,
    SuppliersComponent,
    ProductsComponent,
    CategoriesComponent,
    BrandsComponent
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