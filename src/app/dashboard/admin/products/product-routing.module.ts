import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {AllProductsComponent} from './all-products/all-products.component';
import {CreateProductComponent} from './create-product/create-product.component';
import {UpdateProductComponent} from './update-product/update-product.component';
import {ProductResolverService} from '../../../_service/_resolver/product-resolver.service';

const routes: Routes = [
  {path: '', component: AllProductsComponent},
  {
    path: 'create',
    component: CreateProductComponent,
    data: {
      breadcrumb: 'Create'
    }
  },
  {
    path: ':productId',
    component: UpdateProductComponent,
    data: {
      breadcrumb: (data: any): string => {
        if (data.product == null) {
          return ""
        }
        return data.product.productName
      }
    },
    resolve: {product: ProductResolverService}
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ProductRoutingModule {
}
