import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { WebshopRoutingModule } from './webshop-routing.module';
import { HomeComponent } from './home/home.component';
import { ProductComponent } from './home/product/product.component';
import { ProductDetailComponent } from './product-detail/product-detail.component';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { CheckoutModule } from './checkout/checkout.module';
import { CartModule } from './cart/cart.module';
import { ReviewComponent } from './product-detail/review/review.component';
import { ReactiveFormsModule } from '@angular/forms';
import { SharedModule } from '../_shared/shared.module';

@NgModule({
  declarations: [
    HomeComponent,
    ProductComponent,
    ProductDetailComponent,
    ReviewComponent
  ],
  imports: [
    CommonModule,
    WebshopRoutingModule,
    FontAwesomeModule,
    CheckoutModule,
    CartModule,
    ReactiveFormsModule,
    SharedModule
  ]
})
export class WebshopModule {}
