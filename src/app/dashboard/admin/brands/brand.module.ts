import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';

import {BrandRoutingModule} from './brand-routing.module';
import {AllBrandsComponent} from './all-brands/all-brands.component';
import {CreateBrandComponent} from './create-brand/create-brand.component';
import {UpdateBrandComponent} from './update-brand/update-brand.component';
import {BrandComponent} from './all-brands/brand/brand.component';
import {FormsModule} from "@angular/forms";


@NgModule({
  declarations: [
    AllBrandsComponent,
    CreateBrandComponent,
    UpdateBrandComponent,
    BrandComponent
  ],
  imports: [
    CommonModule,
    BrandRoutingModule,
    FormsModule
  ]
})
export class BrandModule { }
