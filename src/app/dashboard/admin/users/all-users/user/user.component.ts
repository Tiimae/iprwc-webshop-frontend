import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {UserModel} from "../../../../../_models/user.model";
import {ApiConnectorService} from "../../../../../_service/api-connector.service";
import * as CryptoJs from 'crypto-js';
import {ApiMethodsService} from "../../../../../_service/api-methods.service";
import {Router} from "@angular/router";
import {RoleModel} from "../../../../../_models/role.model";

@Component({
  selector: 'app-user',
  templateUrl: './user.component.html',
  styleUrls: ['./user.component.scss']
})
export class UserComponent implements OnInit {

  @Input() user: UserModel | undefined;

  userId: string | undefined;

  @Output() delete: EventEmitter<RoleModel> = new EventEmitter();

  constructor(private router: Router) {
  }

  ngOnInit(): void {
    this.checkIfIdIsUndefined();
  }

  public createUserName(): string {
    let fullName = "";

    if (this.user?.middleName == '') {
      fullName = this.user?.firstName + ' ' + this.user?.lastName
    } else {
      fullName = this.user?.firstName + ' ' + this.user?.middleName + ' ' + this.user?.lastName
    }

    return fullName;
  }

  public removeUser(): void {
    ApiMethodsService.getInstance().delete("user/" + this.user?.id, true).then(r => {
      alert("User has been deleted")
      this.router.navigate(["dashboard", "users"])
      // @ts-ignore
      this.delete.emit(this.user);
    })
  }

  public checkIfIdIsUndefined(): void {
    // @ts-ignore
    if (this.user == undefined) {
      return;
    }

    // @ts-ignore
    let encryptedId: string = CryptoJs.Rabbit.encrypt(this.user.id, ApiConnectorService.getInstance().decryptKey)
    this.userId = encryptedId.toString().replace(new RegExp("/", "g"), "*");
  }

}
