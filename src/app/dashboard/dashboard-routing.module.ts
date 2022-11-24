import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { OrdersComponent } from './orders/orders.component';
import {AccountComponent} from "./account/account.component";
import {AddressesComponent} from "./addresses/addresses.component";
import {InvoicesComponent} from "./invoices/invoices.component";
import {HasRoleGuard} from "../_guard/has-role.guard";
import {ProductsComponent} from "./products/products.component";
import {CategoriesComponent} from "./categories/categories.component";
import {SuppliersComponent} from "./suppliers/suppliers.component";
import {BrandsComponent} from "./brands/brands.component";

const routes: Routes = [
  {path: 'orders', component: OrdersComponent},
  {path: 'account', component: AccountComponent},
  {path: 'addresses', component: AddressesComponent},
  {path: 'invoices', component: InvoicesComponent},
  {
    path: 'products',
    component: ProductsComponent,
    canActivate: [HasRoleGuard],
    loadChildren: () => import('./products/product-routing.module').then(m => m.ProductRoutingModule),
    data: {
      roles: [
        'Owner',
        'Admin'
      ]
    }
  },
  {
    path: 'categories',
    component: CategoriesComponent,
    canActivate: [HasRoleGuard],
    loadChildren: () => import('./categories/categories-routing.module').then(m => m.CategoriesRoutingModule),
    data: {
      roles: [
        'Owner',
        'Admin'
      ]
    }
  },
  {
    path: 'suppliers',
    component: SuppliersComponent,
    canActivate: [HasRoleGuard],
    loadChildren: () => import('./suppliers/suppliers-routing.module').then(m => m.SuppliersRoutingModule),
    data: {
      roles: [
        'Owner',
        'Admin'
      ]
    }
  },
  {
    path: 'brands',
    component: BrandsComponent,
    canActivate: [HasRoleGuard],
    loadChildren: () => import('./brands/brand-routing.module').then(m => m.BrandRoutingModule),
    data: {
      roles: [
        'Owner',
        'Admin'
      ]
    }
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})

export class DashboardRoutingModule { }
