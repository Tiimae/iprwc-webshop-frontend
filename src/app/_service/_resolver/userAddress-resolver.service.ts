import {Injectable} from '@angular/core';
import {ActivatedRouteSnapshot, Resolve, RouterStateSnapshot} from '@angular/router';
import {UserModel} from '../../_models/user.model';
import {UserAddressesModel} from '../../_models/userAddresses.model';
import {ApiConnectorService} from '../_api/api-connector.service';
import {UserDataService} from '../_data/userData.service';
import {UserAddressesDataService} from "../_data/userAddressesData.service";

@Injectable({
  providedIn: 'root'
})
export class UserAddressResolverService
  implements Resolve<UserAddressesModel | undefined>
{
  constructor(
    private userDataService: UserDataService,
    private userAddressesServeice: UserAddressesDataService,
    private api: ApiConnectorService
  ) {}

  async resolve(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ): Promise<UserAddressesModel | undefined> {
    const id = route.params['addressId']

    return this.userAddressesServeice.getByAddressId(id).then(res => {
      return res.data.payload
    })
  }
}
