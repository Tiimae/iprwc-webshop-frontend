import {Injectable} from '@angular/core';
import {ActivatedRouteSnapshot, Resolve, RouterStateSnapshot} from '@angular/router';
import {BrandModel} from 'src/app/_models/brand.model';
import {ApiConnectorService} from '../_api/api-connector.service';
import {BrandDataService} from '../_data/brandData.service';

@Injectable({
  providedIn: 'root'
})
export class BrandResolverService implements Resolve<BrandModel | undefined> {
  constructor(
    private brandDataService: BrandDataService,
    private api: ApiConnectorService
  ) {}

  async resolve(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ): Promise<BrandModel | undefined> {
    const id = route.params['brandId']

    let currentBrand!: BrandModel;
    (await this.brandDataService.get(id)).subscribe(
      (res: BrandModel | undefined) => {
        if (res == undefined) {
          this.brandDataService.getByRequest(id).then((res) => {
            currentBrand = <BrandModel>res.data.payload;
          });
        } else {
          currentBrand = res;
        }
      }
    );
    return currentBrand;
  }
}
