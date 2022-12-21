import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';

import {WebshopRoutingModule} from './webshop-routing.module';
import {HomeComponent} from "./home/home.component";
import { ProductComponent } from './home/product/product.component';
import { ProductDetailComponent } from './product-detail/product-detail.component';
import {FontAwesomeModule} from "@fortawesome/angular-fontawesome";


@NgModule({
  declarations: [
    HomeComponent,
    ProductComponent,
    ProductDetailComponent,
  ],
  imports: [
    CommonModule,
    WebshopRoutingModule,
    FontAwesomeModule
  ]
})
export class WebshopModule { }
