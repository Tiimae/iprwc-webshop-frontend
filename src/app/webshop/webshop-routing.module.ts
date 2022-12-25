import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {HomeComponent} from "./home/home.component";
import {ProductDetailComponent} from "./product-detail/product-detail.component";
import {CartComponent} from "./cart/cart.component";
import {IsAuthenticatedGuard} from "../_guard/is-authenticated.guard";

const routes: Routes = [
  { path: "", component: HomeComponent},
  { path: "product/:productId", component: ProductDetailComponent},
  { path: "cart", component: CartComponent},
  {
    path: "checkout",
    canActivate: [IsAuthenticatedGuard],
    loadChildren: () => import('./checkout/checkout-routing.module').then(m => m.CheckoutRoutingModule),
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class WebshopRoutingModule { }
