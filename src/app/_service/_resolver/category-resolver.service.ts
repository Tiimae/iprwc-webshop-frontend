import { Injectable } from '@angular/core';
import {
  ActivatedRouteSnapshot,
  Resolve,
  RouterStateSnapshot
} from '@angular/router';

import * as CryptoJs from 'crypto-js';
import { CategoryModel } from 'src/app/_models/category.model';
import { ApiConnectorService } from '../_api/api-connector.service';
import { CategoryDataService } from '../_data/categoryData.service';

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
    const categoryId = route.params['categoryId'].replaceAll('*', '/');
    const id = CryptoJs.Rabbit.decrypt(
      categoryId,
      await this.api.getDecryptKey()
    ).toString(CryptoJs.enc.Utf8);

    let currentCategory: CategoryModel | undefined = undefined;
    this.categoryDataService
      .getCurrentCategory(id)
      .subscribe((res: CategoryModel | undefined) => {
        currentCategory = res;
      });
    return currentCategory;
  }
}
