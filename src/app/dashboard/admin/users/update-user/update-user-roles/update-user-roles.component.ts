import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {RoleModel} from "../../../../../_models/role.model";

@Component({
  selector: 'app-update-user-roles',
  templateUrl: './update-user-roles.component.html',
  styleUrls: ['./update-user-roles.component.scss']
})
export class UpdateUserRolesComponent implements OnInit {

  @Input() role: RoleModel | undefined;

  @Output() delete: EventEmitter<RoleModel> = new EventEmitter();

  constructor() { }

  ngOnInit(): void {
  }

  public removeRole(): void {
    this.delete.emit(this.role)
  }

}
