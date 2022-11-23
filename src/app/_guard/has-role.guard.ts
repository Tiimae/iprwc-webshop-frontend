import { Injectable } from '@angular/core';
import {ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot, UrlTree} from '@angular/router';
import { Observable } from 'rxjs';
import {ApiConnectorService} from "../_service/api-connector.service";

@Injectable({
  providedIn: 'root'
})
export class HasRoleGuard implements CanActivate {

  constructor(private router: Router) {
  }

  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
    let isAuthorized = false

    // @ts-ignore
    for (let i = 1; i < route.data.roles.length; i++) {
      // @ts-ignore
      if (ApiConnectorService.getInstance().user.roles.includes(route.data.roles[i])) {
        isAuthorized = true;
        break;
      }
    }

    if (!isAuthorized) {
      this.router.navigate(['404'])
    }

    return isAuthorized;
  }

}
