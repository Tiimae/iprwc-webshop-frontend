import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, RouterStateSnapshot, UrlTree } from '@angular/router';
import { Observable } from 'rxjs';
import {ApiConnectorService} from "../_service/api-connector.service";

@Injectable({
  providedIn: 'root'
})
export class HasRoleGuard implements CanActivate {



  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
    // @ts-ignore
    return ApiConnectorService.getInstance().user.roles.includes(route.data.role);
  }

}
