import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {UserModel} from "../../../../../_models/user.model";
import {ApiConnectorService} from "../../../../../_service/api-connector.service";
import * as CryptoJs from 'crypto-js';

@Component({
  selector: 'app-user',
  templateUrl: './user.component.html',
  styleUrls: ['./user.component.scss']
})
export class UserComponent implements OnInit {

  @Input() user!: UserModel;

  userId: string | undefined;

  @Output() delete: EventEmitter<UserModel> = new EventEmitter();

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
      this.delete.emit(this.user);
  }

  public async checkIfIdIsUndefined(): Promise<void> {
    let encryptedId: string = CryptoJs.Rabbit.encrypt(this.user.id, await ApiConnectorService.getInstance().getDecryptKey()).toString()
    this.userId = encryptedId.replace(new RegExp("/", "g"), "*");
  }

  public getRolesRow(): string {
    let roleString = "";
    let count = 0;

    // @ts-ignore
    this.user.roles.forEach(role => {
      // @ts-ignore
      if (this.user.roles.length - 1 == count) {
        roleString += role.name
      } else {
        roleString += role.name + ", "
      }

      count++
    })

    return roleString;
  }

}
