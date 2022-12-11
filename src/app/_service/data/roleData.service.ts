import {Injectable} from "@angular/core";
import {ApiMethodsService} from "../api-methods.service";
import {Observable, of} from "rxjs";
import {RoleModel} from "../../_models/role.model";

@Injectable({
  providedIn: 'root',
})
export class RoleDataService {

  private roles: RoleModel[] = []

  constructor(
    private api: ApiMethodsService
  ) {
  }

  public setAllNewRoles(): void {

  }

  public getAll(): Promise<Observable<RoleModel[]>> {
    return this.api.get('role', true).then(r => {
      this.roles = r.data.payload
      return of(this.roles);
    });

  }

}
