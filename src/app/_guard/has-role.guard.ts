import { Injectable } from '@angular/core';
import {
  ActivatedRouteSnapshot,
  CanActivate, Router,
  RouterStateSnapshot,
  UrlTree
} from '@angular/router';
import { Observable } from 'rxjs';
import { ApiConnectorService } from '../_service/_api/api-connector.service';
import {ApiMethodsService} from "../_service/_api/api-methods.service";
import {data} from "autoprefixer";
import {AuthService} from "../_service/auth.service";

@Injectable({
  providedIn: 'root'
})
export class HasRoleGuard implements CanActivate {
  constructor(private api: ApiConnectorService, private auth: ApiMethodsService, private router: Router) {}

  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ):
    | Observable<boolean | UrlTree>
    | Promise<boolean | UrlTree>
    | boolean
    | UrlTree {
    return this.api.getJwtPayload().then(res => {
      if (res.userId == null) {
        return this.router.navigate(["404"]);
      }

      const activeRoute = '/' + route.pathFromRoot
        .filter(v => v.routeConfig)
        .map(v => v.routeConfig!.path)
        .join('/');

      return this.auth.post(`user/${res.userId}/has-role`, activeRoute ,true).then(res => {
        if (res.data.payload == false) {
          return this.router.navigate(["404"]);
        }

        return res.data.payload
      });
    })




  }
}
