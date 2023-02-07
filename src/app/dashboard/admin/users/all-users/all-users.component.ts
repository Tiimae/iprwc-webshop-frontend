import { Component, OnInit } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { AppComponent } from '../../../../app.component';
import { UserModel } from '../../../../_models/user.model';
import { UserDataService } from '../../../../_service/_data/userData.service';

@Component({
  selector: 'app-all-users',
  templateUrl: './all-users.component.html',
  styleUrls: ['./all-users.component.scss']
})
export class AllUsersComponent implements OnInit {
  allUsers: UserModel[] = [];

  private count: number = 0;

  constructor(
    private userDataService: UserDataService,
    private toastr: ToastrService
  ) {}

  async ngOnInit(): Promise<void> {
    AppComponent.isLoading = true;

    (await this.userDataService.users$).subscribe((r) => {
      if (r.length < 1 && this.count == 0) {
        this.userDataService.getAllUsers();
        this.count = 1;
      }

      this.allUsers = r.sort((a, b) => {
        if (a.firstName < b.firstName) {
          return -1;
        }
        if (a.firstName > b.firstName) {
          return 1;
        }
        return 0;
      });
    });

    AppComponent.isLoading = false;
  }

  public removeUserOutArray(user: UserModel): void {
    this.userDataService.removeUser(user);
  }
}
