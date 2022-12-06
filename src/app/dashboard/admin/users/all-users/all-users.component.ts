import {Component, OnInit} from '@angular/core';
import {UserModel} from "../../../../_models/user.model";
import {ApiMethodsService} from "../../../../_service/api-methods.service";
import {UserDataService} from "../../../../_service/data/userData.service";

@Component({
  selector: 'app-all-users',
  templateUrl: './all-users.component.html',
  styleUrls: ['./all-users.component.scss']
})
export class AllUsersComponent implements OnInit {

  allUsers : UserModel[] = [];

  constructor() { }

  ngOnInit(): void {
    this.getAllUsers();
  }

  public getAllUsers() : void {
    UserDataService.getInstance()
      .getAllUsers()
      .subscribe(r => {
        this.allUsers = r
      });
  }

  public removeUserOutArray(user: UserModel): void {
    UserDataService.getInstance().removeUser(user);
  }

}
