import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';

import {SuppliersRoutingModule} from './suppliers-routing.module';
import {AllSuppliersComponent} from './all-suppliers/all-suppliers.component';
import {SupplierComponent} from './all-suppliers/supplier/supplier.component';
import {UpdateSupplierComponent} from './update-supplier/update-supplier.component';
import {CreateSupplierComponent} from './create-supplier/create-supplier.component';
import { ReactiveFormsModule } from '@angular/forms';


@NgModule({
  declarations: [
    AllSuppliersComponent,
    SupplierComponent,
    UpdateSupplierComponent,
    CreateSupplierComponent
  ],
  imports: [
    CommonModule,
    SuppliersRoutingModule,
    ReactiveFormsModule
  ]
})
export class SuppliersModule { }
