import {Injectable} from '@angular/core';
import {ActivatedRouteSnapshot, Resolve, RouterStateSnapshot} from '@angular/router';
import {CategoryModel} from 'src/app/_models/category.model';
import {ApiConnectorService} from '../_api/api-connector.service';
import {CategoryDataService} from '../_data/categoryData.service';

@Injectable({
  providedIn: 'root'
})
export class CategoryResolverService
  implements Resolve<CategoryModel | undefined>
{
  constructor(
    private categoryDataService: CategoryDataService,
    private api: ApiConnectorService
  ) {}

  async resolve(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ): Promise<CategoryModel | undefined> {
    const id = route.params['categoryId']

    let currentCategory: CategoryModel | undefined = undefined;
    this.categoryDataService
      .getCurrentCategory(id)
      .subscribe((res: CategoryModel | undefined) => {
        currentCategory = res;
      });
    return currentCategory;
  }
}
