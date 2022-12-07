import {Injectable} from "@angular/core";
import {ApiMethodsService} from "../api-methods.service";
import {Observable, of} from "rxjs";
import {RoleModel} from "../../_models/role.model";

@Injectable({
  providedIn: 'root',
})
export class RoleDataService {

  private roles: RoleModel[] = []

  private static instance: RoleDataService;

  constructor(
    private api: ApiMethodsService
  ) {
    this.setAllNewRoles();
  }

  public static getInstance(): RoleDataService  {
    if (RoleDataService.instance == undefined) {
      RoleDataService.instance = new RoleDataService(new ApiMethodsService());
    }

    return RoleDataService.instance;
  }

  public setAllNewRoles(): void {
    this.api.get('role',true).then(r => {
      r.data.payload.forEach((role: RoleModel) => {
        this.roles.push(role);
      });
    });
  }

  public getAll(): Observable<RoleModel[]> {
    return of(this.roles);
  }

}
