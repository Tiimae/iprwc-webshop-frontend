import {Component, Input, OnInit} from '@angular/core';
import {UserModel} from "../../../../_models/user.model";

@Component({
  selector: 'app-user',
  templateUrl: './user.component.html',
  styleUrls: ['./user.component.scss']
})
export class UserComponent implements OnInit {

  @Input() user: UserModel | undefined;

  constructor() { }

  ngOnInit(): void {
  }

  public createUserName() : string {
    let fullName = "";

    if (this.user?.middleName == '') {
      fullName = this.user?.firstName + ' ' +this.user?.lastName
    } else {
      fullName = this.user?.firstName + ' ' + this.user?.middleName + ' ' + this.user?.lastName
    }

    return fullName;
  }



}
