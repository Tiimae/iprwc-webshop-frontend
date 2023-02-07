import { Injectable } from '@angular/core';
import {
  ActivatedRouteSnapshot,
  Resolve,
  RouterStateSnapshot
} from '@angular/router';

import * as CryptoJs from 'crypto-js';
import { ProductModel } from 'src/app/_models/product.model';
import { ProductDataService } from '../data/productData.service';
import { ApiConnectorService } from '../_api/api-connector.service';

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
    const productId = route.params['productId'].replaceAll('*', '/');
    const id = CryptoJs.Rabbit.decrypt(
      productId,
      await this.api.getDecryptKey()
    ).toString(CryptoJs.enc.Utf8);

    let currentProduct: ProductModel | undefined = undefined;
    this.productDataService
      .get(id)
      .subscribe((res: ProductModel | undefined) => {
        currentProduct = res;
      });
    return currentProduct;
  }
}
