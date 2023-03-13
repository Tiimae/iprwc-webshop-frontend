import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {AllBrandsComponent} from './all-brands/all-brands.component';
import {CreateBrandComponent} from './create-brand/create-brand.component';
import {UpdateBrandComponent} from './update-brand/update-brand.component';
import {BrandResolverService} from '../../../_service/_resolver/brand-resolver.service';

const routes: Routes = [
  {
    path: '',
    component: AllBrandsComponent
  },
  {
    path: 'create',
    component: CreateBrandComponent,
    data: {
      breadcrumb: 'Create'
    }
  },
  {
    path: ':brandId',
    component: UpdateBrandComponent,
    data: {
      breadcrumb: (data: any) => `${data.brand.brandName}`
    },
    resolve: { brand: BrandResolverService }
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class BrandRoutingModule {}
