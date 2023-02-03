import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CartComponent } from './cart.component';
import { CartItemComponent } from './cart-item/cart-item.component';
import { FormsModule } from '@angular/forms';
import { SharedModule } from '../../_shared/shared.module';

@NgModule({
  declarations: [CartComponent, CartItemComponent],
  exports: [CartComponent],
  imports: [CommonModule, FormsModule, SharedModule]
})
export class CartModule {}
