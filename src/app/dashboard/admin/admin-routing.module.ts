import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
const routes: Routes = [

  {
    path: 'products',
    loadChildren: () => import('./products/product-routing.module').then(m => m.ProductRoutingModule),
  },
  {
    path: 'categories',
    loadChildren: () => import('./categories/categories-routing.module').then(m => m.CategoriesRoutingModule),
  },
  {
    path: 'suppliers',
    loadChildren: () => import('./suppliers/suppliers-routing.module').then(m => m.SuppliersRoutingModule),
  },
  {
    path: 'brands',
    loadChildren: () => import('./brands/brand-routing.module').then(m => m.BrandRoutingModule),
  },
  {
    path: 'users',
    loadChildren: () => import('./users/users-routing.module').then(m => m.UsersRoutingModule),
  },

];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AdminRoutingModule { }
