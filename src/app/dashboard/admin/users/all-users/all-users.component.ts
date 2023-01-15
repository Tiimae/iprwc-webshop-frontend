import {Component, OnInit} from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import {UserModel} from "../../../../_models/user.model";
import {UserDataService} from "../../../../_service/data/userData.service";

@Component({
  selector: 'app-all-users',
  templateUrl: './all-users.component.html',
  styleUrls: ['./all-users.component.scss']
})
export class AllUsersComponent implements OnInit {

  allUsers : UserModel[] = [];

  constructor(
    private userDataService: UserDataService,
    private toastr: ToastrService,
  ) { }

  async ngOnInit(): Promise<void> {
    (await this.userDataService
      .users$)
      .subscribe(r => {
        this.allUsers = r.sort((a, b) => {
          if (a.firstName < b.firstName) {
            return -1;
          }
          if (a.firstName > b.firstName) {
            return 1;
          }
          return 0;
        })
      });
  }

  public removeUserOutArray(user: UserModel): void {
    this.userDataService.removeUser(user);
    this.toastr.success("User has been deleted successfully!", "Deleted")
  }

}
