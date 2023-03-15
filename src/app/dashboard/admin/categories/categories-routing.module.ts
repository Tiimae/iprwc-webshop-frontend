import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {AllCategoriesComponent} from './all-categories/all-categories.component';
import {CreateCategoryComponent} from './create-category/create-category.component';
import {UpdateCategoryComponent} from './update-category/update-category.component';
import {CategoryResolverService} from '../../../_service/_resolver/category-resolver.service';

const routes: Routes = [
  {
    path: '',
    component: AllCategoriesComponent
  },
  {
    path: 'create',
    component: CreateCategoryComponent,
    data: {
      breadcrumb: 'Create'
    }
  },
  {
    path: ':categoryId',
    component: UpdateCategoryComponent,
    data: {
      breadcrumb: (data: any): string => {
        if (data.category == null) {
          return ""
        }

        return data.category.categoryName
      }
    },
    resolve: { category: CategoryResolverService }
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class CategoriesRoutingModule {}
