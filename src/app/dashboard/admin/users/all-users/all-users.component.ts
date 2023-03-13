import {Component, OnInit} from '@angular/core';
import {AppComponent} from '../../../../app.component';
import {UserModel} from '../../../../_models/user.model';
import {UserDataService} from '../../../../_service/_data/userData.service';
import {Title} from "@angular/platform-browser";

@Component({
  selector: 'app-all-users',
  templateUrl: './all-users.component.html',
  styleUrls: ['./all-users.component.scss']
})
export class AllUsersComponent implements OnInit {
  public allUsers: UserModel[] = [];

  private count: number = 0;

  constructor(
    private userDataService: UserDataService,
    private title: Title
  ) {}

  ngOnInit(): void {
    AppComponent.isLoading = true;

    this.userDataService.users$.subscribe((r) => {
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

    this.title.setTitle("F1 Webshop | All Users");

    AppComponent.isLoading = false;
  }

  public removeUserOutArray(user: UserModel): void {
    this.userDataService.removeUser(user);
  }
}
