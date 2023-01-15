import {Injectable} from "@angular/core";
import {UserModel} from "../../_models/user.model";
import {BehaviorSubject, Observable, of, Subject} from "rxjs";
import {ApiMethodsService} from "../api-methods.service";
import {ToastrService} from "ngx-toastr";

@Injectable({
  providedIn: 'root'
})
export class UserDataService {

  users: UserModel[] = [];
  users$: Subject<UserModel[]> = new BehaviorSubject<UserModel[]>([]);


  constructor(
    private apiMethod: ApiMethodsService,
    private toastr: ToastrService
  ) {
    this.getAllUsers();
  }

  public async getAllUsers(): Promise<void> {
    return await this.apiMethod.get('user/roles', true).then(r => {
      this.users = r.data.payload
      this.users$.next(this.users);
    });
  }

  public removeUser(user: UserModel) {
    this.users.forEach((currentUser, index) => {
      if (currentUser.id == user.id) {
        this.users.splice(index, 1)
      }
    })

    this.apiMethod.delete("user/" + user.id, true).then(r => {
      this.users$.next(this.users);
    })
  }

  public createNewUser(user: UserModel): boolean {
    let check = true

    this.users.forEach((currentUser: UserModel) => {
      if (user.email === currentUser.email) {
        this.toastr.error('Supplier name is already in user.', 'Failed');
        check = false;
      }
    })

    if (!check) {
      return check;
    }

    let roleIds: string[] = [];

    user.roles.forEach(roles => {
      roleIds.push(roles.id)
    })

    const payload = {
      firstName: user.firstName,
      middleName: user.middleName,
      lastName: user.lastName,
      email: user.email,
      password: "",
      roleIds: roleIds,
      orderIds: [],
      userAddressIds: []
    }

    ApiMethodsService.getInstance().post("user", payload, true).then(r => {
      this.users.push(r.data.payload)
      this.users$.next(this.users);
    });

    return check;
  }

  public getCurrentUser(userId: string): Observable<UserModel | undefined> {
    if (this.users.length != 0) {
      return of(<UserModel>this.users.find(user => user.id === userId));
    }

    return of(undefined);
  }

  public updateUser(user: UserModel): boolean {
    let check = true

    this.users.forEach((currentUser: UserModel) => {
      if (user.email === currentUser.email && user.id != currentUser.id) {
        this.toastr.error('Email already exists.', 'Failed');
        check = false;
      }
    })

    if (!check) {
      return check;
    }

    let roleIds: string[] = []
    let userAddressesId: string[] = []

    user.roles.forEach(role => {
      roleIds.push(role.id)
    })

    user.addresses.forEach(address => {
      userAddressesId.push(address.id)
    })

    const payload = {
      firstName: user.firstName,
      middleName: user.middleName,
      lastName: user.lastName,
      email: user.email,
      password: "",
      roleIds: roleIds,
      orderIds: [],
      userAddressIds: userAddressesId
    }

    ApiMethodsService.getInstance().put("user/" + user.id, payload, true).then(r => {
      this.users[this.users.findIndex(currentUser => currentUser.id === user.id)] = user
      this.users$.next(this.users);
    })

    return check;
  }

}
