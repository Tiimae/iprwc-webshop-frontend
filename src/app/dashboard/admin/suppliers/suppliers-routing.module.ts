import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {AllSuppliersComponent} from './all-suppliers/all-suppliers.component';
import {CreateSupplierComponent} from './create-supplier/create-supplier.component';
import {UpdateSupplierComponent} from './update-supplier/update-supplier.component';
import {SupplierResolverService} from '../../../_service/_resolver/supplier-resolver.service';

const routes: Routes = [
  {
    path: '',
    component: AllSuppliersComponent
  },
  {
    path: 'create',
    component: CreateSupplierComponent,
    data: {
      breadcrumb: 'Create'
    }
  },
  {
    path: ':supplierId',
    component: UpdateSupplierComponent,
    data: {
      breadcrumb: (data: any) => `${data.supplier.name}`
    },
    resolve: { supplier: SupplierResolverService }
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class SuppliersRoutingModule {}
