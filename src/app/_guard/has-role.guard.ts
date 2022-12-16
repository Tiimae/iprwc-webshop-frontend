import {Injectable} from '@angular/core';
import {ActivatedRouteSnapshot, CanActivate, RouterStateSnapshot, UrlTree} from '@angular/router';
import {Observable} from 'rxjs';
import {ApiConnectorService} from "../_service/api-connector.service";

@Injectable({
  providedIn: 'root'
})
export class HasRoleGuard implements CanActivate {
  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
    return new ApiConnectorService().getJwtPayload().then((res): boolean => {
      const rolesOnRoute: null | Array<string> = route.data['roles'];
      let hasRole = false;
      if (res != undefined) {
        rolesOnRoute?.filter((role: string) => {

          const rolesOnJwt: string[] = res.roles;

          if (rolesOnJwt.includes(role)) {
            hasRole = true;
          }
        });
      }

      return hasRole;
    });
  }

}
