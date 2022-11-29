import {Component, OnInit} from '@angular/core';
import {UserModel} from "../../../../_models/user.model";
import {ApiMethodsService} from "../../../../_service/api-methods.service";

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
    ApiMethodsService.getInstance().get('user/roles', true).then(r => {
      r.data.payload.forEach((user: UserModel) => {
        this.allUsers.push(user);
      });
    });
  }

  public removeUserOutArray(user: UserModel): void {
    this.allUsers.forEach((currentUser, index) => {
      if (currentUser.id == user.id) {
        this.allUsers.splice(index, 1)
      }
    })
  }

}
