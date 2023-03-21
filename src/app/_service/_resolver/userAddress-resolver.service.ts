import {Injectable} from '@angular/core';
import {ActivatedRouteSnapshot, Resolve, RouterStateSnapshot} from '@angular/router';
import {UserModel} from '../../_models/user.model';
import {UserAddressesModel} from '../../_models/userAddresses.model';
import {ApiConnectorService} from '../_api/api-connector.service';
import {UserDataService} from '../_data/userData.service';

@Injectable({
  providedIn: 'root'
})
export class UserAddressResolverService
  implements Resolve<UserAddressesModel | undefined>
{
  constructor(
    private userDataService: UserDataService,
    private api: ApiConnectorService
  ) {}

  async resolve(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ): Promise<UserAddressesModel | undefined> {
    const id = route.params['addressId']

    let currentUserAddress: UserAddressesModel | undefined;
    return this.api
      .getJwtPayload()
      .then((payload): UserAddressesModel | undefined => {
        this.userDataService
          .getCurrentUser(payload.userId)
          .subscribe((res: UserModel | undefined) => {
            if (res != undefined) {
              currentUserAddress = res.addresses.find(
                (address) => address.id === id
              );
              return;
            }
          });

        return currentUserAddress;
      });
  }
}
