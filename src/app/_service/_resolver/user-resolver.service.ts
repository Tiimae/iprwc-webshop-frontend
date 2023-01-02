import {Injectable} from "@angular/core";
import {ActivatedRouteSnapshot, Resolve, RouterStateSnapshot} from "@angular/router";
import {UserModel} from "../../_models/user.model";
import {HttpClient} from "@angular/common/http";
import {Observable} from "rxjs";
import {environment} from "src/environments/environment";
import {UserDataService} from "../data/userData.service";
import * as CryptoJs from "crypto-js";
import {ApiConnectorService} from "../api-connector.service";

@Injectable({
  providedIn: 'root'
})
export class UserResolverService implements Resolve<UserModel | undefined> {

  constructor(
    private userDataService: UserDataService,
    private api: ApiConnectorService
  ) {
  }

  async resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Promise<UserModel | undefined> {
    const currentUserId = route.params['userId'].replaceAll("*", "/");
    const id = CryptoJs.Rabbit.decrypt(currentUserId, await this.api.getDecryptKey()).toString(CryptoJs.enc.Utf8)

    let currentUser: UserModel | undefined = undefined
    this.userDataService.getCurrentUser(id).subscribe((res: UserModel | undefined) => {
      currentUser = res
    });
    return currentUser;
  }

}
