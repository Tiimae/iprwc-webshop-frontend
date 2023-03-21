import { Injectable } from '@angular/core';
import {ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot, UrlTree} from '@angular/router';
import { Observable } from 'rxjs';
import {ApiConnectorService} from "../_service/_api/api-connector.service";
import {ApiMethodsService} from "../_service/_api/api-methods.service";
import {AppComponent} from "../app.component";

@Injectable({
  providedIn: 'root'
})
export class IsVerifiedGuard implements CanActivate {

  constructor(private api: ApiConnectorService, private auth: ApiMethodsService, private router: Router) {
  }
  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
    if (AppComponent.verified == null) {
      return this.api.getJwtPayload().then(res => {
        if (res.userId == null) {
          return this.router.navigate(["404"]);
        }
        return this.auth.get(`user/${res.userId}/verified`, true).then(verified => {
          AppComponent.verified = verified.data.payload

          if (!verified.data.payload) {
            return this.router.navigateByUrl('/auth/verify-request');
          }

          return true;
        });
      })
    } else {
      if (!AppComponent.verified) {
        return this.router.navigateByUrl('/auth/verify-request');
      }

      return AppComponent.verified;
    }
  }

}
