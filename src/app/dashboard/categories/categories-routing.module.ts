import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import {AllCategoriesComponent} from "./all-categories/all-categories.component";
import * as path from "path";
import { CreateCategoryComponent } from './create-category/create-category.component';
import { UpdateCategoryComponent } from './update-category/update-category.component';

const routes: Routes = [
  {
    path: "",
    component: AllCategoriesComponent
  },
  {
    path: "create",
    component: CreateCategoryComponent
  },
  {
    path: ":category",
    component: UpdateCategoryComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class CategoriesRoutingModule { }
