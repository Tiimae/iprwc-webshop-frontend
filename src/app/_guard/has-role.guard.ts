import {Injectable} from '@angular/core';
import {ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot, UrlTree} from '@angular/router';
import {Observable} from 'rxjs';
import {ApiConnectorService} from '../_service/_api/api-connector.service';
import {ApiMethodsService} from "../_service/_api/api-methods.service";
import {AppComponent} from "../app.component";

@Injectable({
  providedIn: 'root'
})
export class HasRoleGuard implements CanActivate {
  constructor(private api: ApiConnectorService, private auth: ApiMethodsService, private router: Router) {
  }

  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ):
    | Observable<boolean | UrlTree>
    | Promise<boolean | UrlTree>
    | boolean
    | UrlTree {


    if (AppComponent.hasRole == null) {
      return this.api.getJwtPayload().then(res => {
        if (res.userId == null) {
          return this.router.navigate(["404"]);
        }
        return this.auth.get(`user/${res.userId}/has-role`, true).then(res => {
          AppComponent.hasRole = res.data.payload

          if (!AppComponent.hasRole) {
            return this.router.navigate(["404"])
          }

          return AppComponent.hasRole;
        });
      })


    } else {
      if (!AppComponent.hasRole) {
        return this.router.navigate(["404"])
      }

      return AppComponent.hasRole;
    }
  }
}
