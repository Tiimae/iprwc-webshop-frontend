import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { DashboardRoutingModule } from './dashboard-routing.module';
import { OrdersComponent } from './orders/orders.component';
import { SidebarComponent } from './sidebar/sidebar.component';
import {FontAwesomeModule} from "@fortawesome/angular-fontawesome";
import { AddressesComponent } from './addresses/addresses.component';
import { InvoicesComponent } from './invoices/invoices.component';
import { ProductsComponent } from './products/products.component';
import { CategoriesComponent } from './categories/categories.component';
import { SuppliersComponent } from './suppliers/suppliers.component';
import { BrandsComponent } from './brands/brands.component';
import { AccountComponent } from './account/account.component';
import {FormsModule} from "@angular/forms";


@NgModule({
  declarations: [
    OrdersComponent,
    SidebarComponent,
    AddressesComponent,
    InvoicesComponent,
    ProductsComponent,
    CategoriesComponent,
    SuppliersComponent,
    BrandsComponent,
    AccountComponent
  ],
  exports: [
    SidebarComponent
  ],
  imports: [
    CommonModule,
    DashboardRoutingModule,
    FontAwesomeModule,
    FormsModule,
  ]
})

export class DashboardModule { }
