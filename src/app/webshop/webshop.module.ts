import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';

import {WebshopRoutingModule} from './webshop-routing.module';
import {HomeComponent} from "./home/home.component";
import { ProductComponent } from './home/product/product.component';
import { ProductDetailComponent } from './product-detail/product-detail.component';
import {FontAwesomeModule} from "@fortawesome/angular-fontawesome";
import { CartComponent } from './cart/cart.component';
import { CartItemComponent } from './cart/cart-item/cart-item.component';


@NgModule({
  declarations: [
    HomeComponent,
    ProductComponent,
    ProductDetailComponent,
    CartComponent,
    CartItemComponent,
  ],
  imports: [
    CommonModule,
    WebshopRoutingModule,
    FontAwesomeModule
  ]
})
export class WebshopModule { }
