import { Injectable } from '@angular/core';
import {
  ActivatedRouteSnapshot,
  Resolve,
  RouterStateSnapshot
} from '@angular/router';

import * as CryptoJs from 'crypto-js';
import { ApiConnectorService } from '../api-connector.service';
import { ProductModel } from 'src/app/_models/product.model';
import { ProductDataService } from '../data/productData.service';

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
