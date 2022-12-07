import {Injectable} from "@angular/core";
import {UserModel} from "../../_models/user.model";
import {Observable, of} from "rxjs";
import {ApiMethodsService} from "../api-methods.service";

@Injectable({
  providedIn: 'root'
})
export class UserDataService {

  users: UserModel[] = [];

  private static instance: UserDataService;

  constructor(
    private apiMethod: ApiMethodsService
  ) {
    this.setAllNewUsers();
  }

  public static getInstance(): UserDataService  {
    if (UserDataService.instance == undefined) {
      UserDataService.instance = new UserDataService(new ApiMethodsService());
    }

    return UserDataService.instance;
  }

  public async setAllNewUsers(): Promise<void> {
    this.apiMethod.get('user/roles', true).then(r => {
      r.data.payload.forEach((user: UserModel) => {
        this.users.push(user);
      });
    });
  }

  public getAllUsers(): Observable<UserModel[]> {
    return of(this.users);
  }

  public removeUser(user: UserModel) {
    this.users.forEach((currentUser, index) => {
      if (currentUser.id == user.id) {
        this.users.splice(index, 1)
      }
    })

    this.apiMethod.delete("user/" + user.id, true).then(r => {
      alert("User has been deleted")
    })
  }

  public createNewUser(user: UserModel): void {
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

    ApiMethodsService.getInstance().post("user",  payload, true).then(r => {
      this.users.push(r.data.payload)
    });
  }

}
