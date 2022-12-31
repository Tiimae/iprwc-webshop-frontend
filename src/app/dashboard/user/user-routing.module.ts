import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {OrdersComponent} from "./orders/orders.component";
import {AccountComponent} from "./account/account.component";
import {InvoicesComponent} from "./invoices/invoices.component";

const routes: Routes = [

  {path: 'orders', component: OrdersComponent},
  {path: 'account', component: AccountComponent},
  {
    path: 'addresses',
    loadChildren: () => import('./addresses/addresses-routing.module').then(m => m.AddressesRoutingModule),
  },
  {path: 'invoices', component: InvoicesComponent},

];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class UserRoutingModule { }
