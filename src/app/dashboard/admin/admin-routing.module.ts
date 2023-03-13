import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';

const routes: Routes = [
  {
    path: 'products',
    loadChildren: () =>
      import('./products/product-routing.module').then(
        (m) => m.ProductRoutingModule
      ),
    data: {
      breadcrumb: 'Products'
    }
  },
  {
    path: 'categories',
    loadChildren: () =>
      import('./categories/categories-routing.module').then(
        (m) => m.CategoriesRoutingModule
      ),
    data: {
      breadcrumb: 'Categories'
    }
  },
  {
    path: 'suppliers',
    loadChildren: () =>
      import('./suppliers/suppliers-routing.module').then(
        (m) => m.SuppliersRoutingModule
      ),
    data: {
      breadcrumb: 'Suppliers'
    }
  },
  {
    path: 'brands',
    loadChildren: () =>
      import('./brands/brand-routing.module').then((m) => m.BrandRoutingModule),
    data: {
      breadcrumb: 'Brands'
    }
  },
  {
    path: 'users',
    loadChildren: () =>
      import('./users/users-routing.module').then((m) => m.UsersRoutingModule),
    data: {
      breadcrumb: 'Users'
    }
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AdminRoutingModule {}
