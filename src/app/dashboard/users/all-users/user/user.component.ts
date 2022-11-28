import {Component, Input, OnInit} from '@angular/core';
import {UserModel} from "../../../../_models/user.model";
import {ApiConnectorService} from "../../../../_service/api-connector.service";
import * as CryptoJs from 'crypto-js';

@Component({
  selector: 'app-user',
  templateUrl: './user.component.html',
  styleUrls: ['./user.component.scss']
})
export class UserComponent implements OnInit {

  @Input() user: UserModel | undefined;

  userId: string | undefined;

  constructor() {
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

  }

  public checkIfIdIsUndefined(): void {
    // @ts-ignore
    if (this.user == undefined) {
      return;
    }

    // @ts-ignore
    let encryptedId = CryptoJs.Rabbit.encrypt(this.user.id, ApiConnectorService.getInstance().decryptKey)
    this.userId = encryptedId.toString().replace("/", "*");
  }

}
