import {Injectable} from '@angular/core';
import {ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot, UrlTree} from '@angular/router';
import {Observable} from 'rxjs';
import {ApiConnectorService} from "../_service/api-connector.service";

@Injectable({
  providedIn: 'root'
})
export class HasRoleGuard implements CanActivate {

  // private jwtData : Promise<LoggedUserModel | undefined>

  constructor(
    private router: Router
              ) {

  }

  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
    let isAuthorized = false
    // this.jwtData = ApiConnectorService.getInstance().getJwtPayload();
    // @ts-ignore
    isAuthorized = ApiConnectorService.getInstance().getJwtPayload().then((r): boolean =>  {
      for (let i = 1; i < route.data['roles'].length; i++) {
        // @ts-ignore
        if (r.roles.includes(route.data['roles'][i])) {
          return true;
        }
      }
    });

    return isAuthorized;
  }

}
