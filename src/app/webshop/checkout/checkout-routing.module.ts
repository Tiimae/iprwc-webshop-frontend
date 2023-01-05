import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import {IsAuthenticatedGuard} from "../../_guard/is-authenticated.guard";
import { PayComponent } from './pay/pay.component';

const routes: Routes = [
  {
    path: "pay",
    component: PayComponent,
    canActivate: [IsAuthenticatedGuard],
    data: {
      breadcrumb: "Pay"
    }
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class CheckoutRoutingModule { }
