import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {OrdersComponent} from "./orders/orders.component";
import {AccountComponent} from "./account/account.component";
import {AddressesComponent} from "./addresses/addresses.component";
import {InvoicesComponent} from "./invoices/invoices.component";

const routes: Routes = [

  {path: 'orders', component: OrdersComponent},
  {path: 'account', component: AccountComponent},
  {path: 'addresses', component: AddressesComponent},
  {path: 'invoices', component: InvoicesComponent},

];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class UserRoutingModule { }
