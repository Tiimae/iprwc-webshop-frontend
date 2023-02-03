import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { OrdersRoutingModule } from './orders-routing.module';
import { AllOrdersComponent } from './all-orders/all-orders.component';
import { UserOrderComponent } from './all-orders/user-order/user-order.component';
import { ProductComponent } from './all-orders/user-order/product/product.component';

@NgModule({
  declarations: [AllOrdersComponent, UserOrderComponent, ProductComponent],
  imports: [CommonModule, OrdersRoutingModule]
})
export class OrdersModule {}
