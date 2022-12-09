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

  constructor(private userDataService: UserDataService) { }

  async ngOnInit(): Promise<void> {
    (await this.userDataService
      .getAllUsers())
      .subscribe(r => {
        this.allUsers = r
      });
  }

  public removeUserOutArray(user: UserModel): void {
    this.userDataService.removeUser(user);
  }

}
