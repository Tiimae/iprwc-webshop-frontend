import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {AccountComponent} from "./account/account.component";
import {InvoicesComponent} from "./invoices/invoices.component";

const routes: Routes = [

  {
    path: 'orders',
    loadChildren: () => import('./orders/orders-routing.module').then(m => m.OrdersRoutingModule),
    data: {
      breadcrumb: 'Orders'
    }
  },
  {
    path: 'account',
    component: AccountComponent,
    data: {
      breadcrumb: 'Account'
    }
  },
  {
    path: 'addresses',
    loadChildren: () => import('./addresses/addresses-routing.module').then(m => m.AddressesRoutingModule),
    data: {
      breadcrumb: 'Addresses'
    }
  },
  {
    path: 'invoices', component: InvoicesComponent,
    data: {
      breadcrumb: 'Invoices'
    }
  },

];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class UserRoutingModule { }
