import { Injectable } from '@angular/core';
import {
  ActivatedRouteSnapshot,
  CanActivate, Router,
  RouterStateSnapshot,
  UrlTree
} from '@angular/router';
import { Observable } from 'rxjs';
import { ApiConnectorService } from '../_service/_api/api-connector.service';

@Injectable({
  providedIn: 'root'
})
export class HasRoleGuard implements CanActivate {
  constructor(private api: ApiConnectorService, private router: Router) {}

  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ):
    | Observable<boolean | UrlTree>
    | Promise<boolean | UrlTree>
    | boolean
    | UrlTree {
    return this.api.getJwtPayload().then(res => {
      let matchingRoles: string[] | undefined;
      const rolesOnRoute: null | Array<string> = route.data['roles'];

      matchingRoles = rolesOnRoute?.filter((role: string) => {
        const rolesOnJwt: Array<string> = res['roles'];

        return rolesOnJwt.includes(role);
      });

      if ((matchingRoles?.length ?? 0) === 0) {
        return this.router.navigate(["404"]);
      }

      return true;
    });
  }
}
