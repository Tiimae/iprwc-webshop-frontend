import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {HomeComponent} from "./home/home.component";
import {ProductDetailComponent} from "./product-detail/product-detail.component";
import {CartComponent} from "./cart/cart.component";
import {IsAuthenticatedGuard} from "../_guard/is-authenticated.guard";
import {ProductResolverService} from "../_service/_resolver/product-resolver.service";

const routes: Routes = [
  {
    path: "", component: HomeComponent
  },
  {
    path: "product/:productId",
    component: ProductDetailComponent,
    data: {
      breadcrumb: (data: any) => `${data.product.productName}`
    },
    resolve: {product: ProductResolverService}
  },
  {
    path: "cart",
    component: CartComponent,
    data: {
      breadcrumb: "Cart"
    }
  },
  {
    path: "checkout",
    canActivate: [IsAuthenticatedGuard],
    loadChildren: () => import('./checkout/checkout-routing.module').then(m => m.CheckoutRoutingModule),
    data: {
      breadcrumb: "Checkout"
    }
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class WebshopRoutingModule { }
