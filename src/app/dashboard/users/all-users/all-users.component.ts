import { Component, OnInit } from '@angular/core';
import {UserModel} from "../../../_models/user.model";
import {ApiConnectorService} from "../../../_service/api-connector.service";

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
    ApiConnectorService.getInstance().auth().get('user/roles').then(r => {
      r.data.payload.forEach((user: UserModel) => {
        this.allUsers.push(user);
      });
    });
  }

}
