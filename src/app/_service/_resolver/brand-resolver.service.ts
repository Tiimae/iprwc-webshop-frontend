import {Injectable} from "@angular/core";
import {ActivatedRouteSnapshot, Resolve, RouterStateSnapshot} from "@angular/router";

import * as CryptoJs from "crypto-js";
import {ApiConnectorService} from "../api-connector.service";
import { BrandModel } from "src/app/_models/brand.model";
import {BrandDataService} from "../data/brandData.service";

@Injectable({
  providedIn: 'root'
})
export class BrandResolverService implements Resolve<BrandModel | undefined> {

  constructor(
    private brandDataService: BrandDataService,
    private api: ApiConnectorService
  ) {
  }

  async resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Promise<BrandModel | undefined> {
    const brandId = route.params['brandId'].replaceAll("*", "/");
    const id = CryptoJs.Rabbit.decrypt(brandId, await this.api.getDecryptKey()).toString(CryptoJs.enc.Utf8)

    let currentBrand!: BrandModel
    (await this.brandDataService.get(id)).subscribe((res: BrandModel) => {
      currentBrand = res
    });
    return currentBrand;
  }

}
