import {Injectable} from "@angular/core";
import {ActivatedRouteSnapshot, Resolve, RouterStateSnapshot} from "@angular/router";

import * as CryptoJs from "crypto-js";
import {ApiConnectorService} from "../api-connector.service";
import { SupplierModel } from "src/app/_models/supplier.model";
import {SupplierDataService} from "../data/supplierData.service";

@Injectable({
  providedIn: 'root'
})
export class SupplierResolverService implements Resolve<SupplierModel | undefined> {

  constructor(
    private supplierDataService: SupplierDataService,
    private api: ApiConnectorService
  ) {
  }

  async resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Promise<SupplierModel | undefined> {
    const supplierId = route.params['supplierId'].replaceAll("*", "/");
    const id = CryptoJs.Rabbit.decrypt(supplierId, await this.api.getDecryptKey()).toString(CryptoJs.enc.Utf8)

    let currentSupplier: SupplierModel | undefined = undefined
    this.supplierDataService.get(id).subscribe((res: SupplierModel | undefined) => {
      currentSupplier = res
    });
    return currentSupplier;
  }

}
