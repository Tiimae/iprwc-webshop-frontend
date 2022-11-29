import {Component, Input, OnInit} from '@angular/core';
import {RoleModel} from "../../../../../../_models/role.model";

@Component({
  selector: 'app-user-roles',
  templateUrl: './user-roles.component.html',
  styleUrls: ['./user-roles.component.scss']
})
export class UserRolesComponent implements OnInit {

  @Input() roles: RoleModel[] | undefined;

  constructor() { }

  ngOnInit(): void {
  }

  public getRolesRow(): string {
    let roleString = "";
    let count = 0;

    // @ts-ignore
    this.roles.forEach(role => {
      // @ts-ignore
      if (this.roles?.length - 1 == count) {
        roleString += role.name
      } else {
        roleString += role.name + ", "
      }

      count++
    })

    return roleString;
  }

}
