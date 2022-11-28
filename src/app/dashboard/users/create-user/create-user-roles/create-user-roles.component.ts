import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {RoleModel} from "../../../../_models/role.model";

@Component({
  selector: 'app-create-user-roles',
  templateUrl: './create-user-roles.component.html',
  styleUrls: ['./create-user-roles.component.scss']
})
export class CreateUserRolesComponent implements OnInit {

  @Input() role: RoleModel | undefined;

  @Output() delete: EventEmitter<RoleModel> = new EventEmitter();

  constructor() { }

  ngOnInit(): void {
  }

  public removeRole(): void {
    this.delete.emit(this.role)
  }

}
