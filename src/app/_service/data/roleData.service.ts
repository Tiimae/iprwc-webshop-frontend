import { Injectable } from '@angular/core';
import { AxiosResponse } from 'axios';
import { Observable, of } from 'rxjs';
import { RoleModel } from '../../_models/role.model';
import { ApiMethodsService } from '../api-methods.service';

@Injectable({
  providedIn: 'root'
})
export class RoleDataService {
  private roles: RoleModel[] = [];

  constructor(private api: ApiMethodsService) {}

  public getAll(): Promise<Observable<RoleModel[]>> {
    return this.api.get('role', true).then((r: AxiosResponse) => {
      this.roles = r.data.payload;
      return of(this.roles);
    });
  }
}
