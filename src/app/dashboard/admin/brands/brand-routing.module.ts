import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {AllBrandsComponent} from "./all-brands/all-brands.component";
import {CreateBrandComponent} from "./create-brand/create-brand.component";
import {UpdateBrandComponent} from "./update-brand/update-brand.component";

const routes: Routes = [
  {
    path: "",
    component: AllBrandsComponent
  },
  {
    path: "create",
    component: CreateBrandComponent
  },
  {
    path: ":brandId",
    component: UpdateBrandComponent
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class BrandRoutingModule { }
