import { Injectable } from '@angular/core';
import {
  ActivatedRouteSnapshot,
  Resolve,
  RouterStateSnapshot
} from '@angular/router';

import * as CryptoJs from 'crypto-js';
import { ProductModel } from 'src/app/_models/product.model';
import { ApiConnectorService } from '../_api/api-connector.service';
import { ProductDataService } from '../_data/productData.service';

@Injectable({
  providedIn: 'root'
})
export class ProductResolverService
  implements Resolve<ProductModel | undefined>
{
  constructor(
    private productDataService: ProductDataService,
    private api: ApiConnectorService
  ) {}

  async resolve(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ): Promise<ProductModel | undefined> {
    const id = route.params['productId']

    let currentProduct: ProductModel | undefined = undefined;
    this.productDataService
      .get(id)
      .subscribe((res: ProductModel | undefined) => {
        currentProduct = res;
      });
    return currentProduct;
  }
}
