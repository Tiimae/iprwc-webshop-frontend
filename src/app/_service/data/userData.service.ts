import {Injectable} from "@angular/core";
import {UserModel} from "../../_models/user.model";
import {ApiConnectorService} from "../api-connector.service";
import {Observable, of} from "rxjs";
import {ApiMethodsService} from "../api-methods.service";

@Injectable({
  providedIn: 'root'
})
export class UserDataService {

  private users: UserModel[] = [];

  private static instance: UserDataService | null = null;

  constructor(
    private apiMethod: ApiMethodsService
  ) {
    this.setAllNewUsers();
  }

  public static getInstance(): UserDataService  {
    return this.instance instanceof UserDataService ? this.instance : new UserDataService(new ApiMethodsService());
  }

  public async setAllNewUsers(): Promise<void> {
    this.apiMethod.get('user/roles', true).then(r => {
      r.data.payload.forEach((user: UserModel) => {
        this.users.push(user);
      });
    });

    console.log(this.users)
  }

  public getAllUsers(): Observable<UserModel[]> {
    return of(this.users);
  }

  public removeUser(user: UserModel) {
    this.users.splice(this.users.findIndex(currentUser => currentUser.id === user.id), 1)

    this.apiMethod.delete("user/" + user.id, true).then(r => {
      alert("User has been deleted")
    })
  }

}
