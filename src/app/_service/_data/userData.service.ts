import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { AxiosResponse } from 'axios';
import { ToastrService } from 'ngx-toastr';
import { BehaviorSubject, Observable, of, Subject } from 'rxjs';
import { UserModel } from '../../_models/user.model';
import { ApiMethodsService } from '../_api/api-methods.service';

@Injectable({
  providedIn: 'root'
})
export class UserDataService {
  private users: UserModel[] = [];
  public users$: Subject<UserModel[]> = new BehaviorSubject<UserModel[]>([]);

  constructor(
    private apiMethod: ApiMethodsService,
    private toastr: ToastrService,
    private router: Router
  ) {}

  public getCurrentUser(userId: string): Observable<UserModel | undefined> {
    if (this.users.length != 0) {
      return of(<UserModel>this.users.find((user) => user.id === userId));
    }

    return of(undefined);
  }

  public async getUserByRequest(userId: string): Promise<AxiosResponse> {
    return this.apiMethod.get('user/' + userId, true);
  }

  public async getAllUsers(): Promise<void> {
    return await this.apiMethod
      .get('user/roles', true)
      .then((r: AxiosResponse) => {
        this.users = r.data.payload;
        this.users$.next(this.users);
      });
  }

  public createNewUser(user: UserModel): void {
    let roleIds: string[] = [];

    user.roles.forEach((roles) => {
      roleIds.push(roles.id);
    });

    const payload = {
      firstName: user.firstName,
      middleName: user.middleName,
      lastName: user.lastName,
      email: user.email,
      password: '',
      verified: false,
      resetRequired: true,
      roleIds: roleIds,
      orderIds: [],
      userAddressIds: []
    };

    this.apiMethod.post('user', payload, true).then((res: AxiosResponse) => {
      if (res.data.code === 202) {
        this.users.push(res.data.payload);
        this.users$.next(this.users);
        this.toastr.success('User has been created successfully!', 'Created');
        this.router.navigate(['dashboard', 'admin', 'users']);
      } else if (res.data.code === 400) {
        this.toastr.error(res.data.message, res.data.code);
      }
    });
  }

  public updateUser(user: UserModel, admin: boolean): void {
    let roleIds: string[] = [];
    let userAddressesId: string[] = [];

    user.roles.forEach((role) => {
      roleIds.push(role.id);
    });

    user.addresses.forEach((address) => {
      userAddressesId.push(address.id);
    });

    const payload = {
      firstName: user.firstName,
      middleName: user.middleName,
      lastName: user.lastName,
      email: user.email,
      password: '',
      roleIds: roleIds,
      orderIds: [],
      userAddressIds: userAddressesId
    };

    if (!admin) {
      this.apiMethod
        .put('user/' + user.id, payload, true)
        .then((res: AxiosResponse) => {
          if (res.data.code === 202) {
            this.users[
              this.users.findIndex((currentUser) => currentUser.id === user.id)
            ] = user;
            this.users$.next(this.users);
            this.toastr.success(
              'User has been updated successfully!',
              'Updated'
            );
            this.router.navigate(['dashboard', 'admin', 'users']);
          } else if (res.data.code === 400) {
            this.toastr.error(res.data.message, res.data.code);
          }
        });
    } else {
      this.apiMethod
        .put('user/' + user.id + '/admin', payload, true)
        .then((res: AxiosResponse) => {
          if (res.data.code === 202) {
            this.users[
              this.users.findIndex((currentUser) => currentUser.id === user.id)
            ] = user;
            this.users$.next(this.users);
            this.toastr.success(
              'User has been updated successfully!',
              'Updated'
            );
            this.router.navigate(['dashboard', 'admin', 'users']);
          } else if (res.data.code === 400) {
            this.toastr.error(res.data.message, res.data.code);
          }
        });
    }
  }

  public removeUser(user: UserModel) {
    this.apiMethod
      .delete('user/' + user.id, true)
      .then((res: AxiosResponse) => {
        if (res.data.code === 202) {
          this.users.forEach((currentUser, index) => {
            if (currentUser.id == user.id) {
              this.users.splice(index, 1);
            }
          });
          this.users$.next(this.users);
          this.toastr.success('User has been deleted successfully!', 'Deleted');
        } else if (res.data.code === 400) {
          this.toastr.error(res.data.message, res.data.code);
        }
      });
  }
}
