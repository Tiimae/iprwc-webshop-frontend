import {Injectable} from '@angular/core';
import {ActivatedRouteSnapshot, Resolve, RouterStateSnapshot} from '@angular/router';
import {UserModel} from '../../_models/user.model';
import {ApiConnectorService} from '../_api/api-connector.service';
import {UserDataService} from '../_data/userData.service';

@Injectable({
  providedIn: 'root'
})
export class UserResolverService implements Resolve<UserModel | undefined> {
  constructor(
    private userDataService: UserDataService,
    private api: ApiConnectorService
  ) {}

  async resolve(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ): Promise<UserModel | undefined> {
    const id = route.params['userId']

    let currentUser: UserModel | undefined = undefined;
    this.userDataService
      .getCurrentUser(id)
      .subscribe((res: UserModel | undefined) => {
        currentUser = res;
      });
    return currentUser;
  }
}
