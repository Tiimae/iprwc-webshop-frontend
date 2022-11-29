import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {ProductsComponent} from "./products/products.component";
import {CategoriesComponent} from "./categories/categories.component";
import {SuppliersComponent} from "./suppliers/suppliers.component";
import {BrandsComponent} from "./brands/brands.component";
import {UsersComponent} from "./users/users.component";

const routes: Routes = [

  {
    path: 'products',
    component: ProductsComponent,
    loadChildren: () => import('./products/product-routing.module').then(m => m.ProductRoutingModule),
  },
  {
    path: 'categories',
    component: CategoriesComponent,
    loadChildren: () => import('./categories/categories-routing.module').then(m => m.CategoriesRoutingModule),
  },
  {
    path: 'suppliers',
    component: SuppliersComponent,
    loadChildren: () => import('./suppliers/suppliers-routing.module').then(m => m.SuppliersRoutingModule),
  },
  {
    path: 'brands',
    component: BrandsComponent,
    loadChildren: () => import('./brands/brand-routing.module').then(m => m.BrandRoutingModule),
  },
  {
    path: 'users',
    component: UsersComponent,
    loadChildren: () => import('./users/users-routing.module').then(m => m.UsersRoutingModule),
  },

];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AdminRoutingModule { }
