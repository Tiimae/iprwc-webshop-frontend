import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {AllSuppliersComponent} from "./all-suppliers/all-suppliers.component";
import {CreateSupplierComponent} from "./create-supplier/create-supplier.component";
import {UpdateSupplierComponent} from "./update-supplier/update-supplier.component";

const routes: Routes = [
  {
    path: "",
    component: AllSuppliersComponent
  },
  {
    path: "create",
    component: CreateSupplierComponent
  },
  {
    path: ":supplierId",
    component: UpdateSupplierComponent
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class SuppliersRoutingModule { }
