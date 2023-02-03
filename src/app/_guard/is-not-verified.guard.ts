import { Injectable } from '@angular/core';
import {
  ActivatedRouteSnapshot,
  CanActivate,
  Router,
  RouterStateSnapshot,
  UrlTree
} from '@angular/router';
import { Observable } from 'rxjs';
import { ApiConnectorService } from '../_service/api-connector.service';

@Injectable({
  providedIn: 'root'
})
export class IsNotVerifiedGuard implements CanActivate {
  constructor(
    private router: Router,
    private apiConnectorService: ApiConnectorService
  ) {}

  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ):
    | Observable<boolean | UrlTree>
    | Promise<boolean | UrlTree>
    | boolean
    | UrlTree {
    return this.apiConnectorService
      .verified()
      .then(async (isVerified: boolean) => {
        if (isVerified) {
          this.router.navigate(['/']);
        }
        return true;
      });
  }
}
