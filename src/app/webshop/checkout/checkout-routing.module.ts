import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {IsAuthenticatedGuard} from '../../_guard/is-authenticated.guard';
import {PayComponent} from './pay/pay.component';
import {IsVerifiedGuard} from "../../_guard/is-verified.guard";

const routes: Routes = [
  {
    path: 'pay',
    component: PayComponent,
    canActivate: [IsAuthenticatedGuard, IsVerifiedGuard],
    data: {
      breadcrumb: 'Pay'
    }
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class CheckoutRoutingModule {}
