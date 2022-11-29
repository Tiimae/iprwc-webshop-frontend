import {Component, OnInit, ViewChild} from '@angular/core';
import {ApiMethodsService} from "../../../../_service/api-methods.service";
import {RoleModel} from "../../../../_models/role.model";
import {NgForm} from "@angular/forms";
import {Router} from "@angular/router";

@Component({
  selector: 'app-create-user',
  templateUrl: './create-user.component.html',
  styleUrls: ['./create-user.component.scss']
})
export class CreateUserComponent implements OnInit {

  roles: RoleModel[] = []
  userRoles: RoleModel[] = []
  @ViewChild('f') createForm: NgForm | undefined;

  constructor(private router: Router) { }

  ngOnInit(): void {
    ApiMethodsService.getInstance().get("role", true).then(r => {
      r.data.payload.forEach((role: RoleModel) => {
        this.roles.push(role as RoleModel)
      });
    });
  }

  public onSubmit(): void {
    let roleIds: string[] = [];

    this.userRoles.forEach(roles => {
      roleIds.push(roles.id)
    })

    const payload = {
      firstName: this.createForm?.form.controls['firstname'].value,
      middleName: this.createForm?.form.controls['middlename'].value,
      lastName: this.createForm?.form.controls['lastname'].value,
      email: this.createForm?.form.controls['email'].value,
      password: "",
      roleIds: roleIds,
      orderIds: [],
      userAddressIds: []
    }

    ApiMethodsService.getInstance().post("/user",  payload, true).then(r => {
      alert("User has been updated");
      this.router.navigate(["dashboard", "users"]);
    });
  }

  public removeRoleOutArray(role: RoleModel) {
    this.userRoles.forEach((currentRole, index) => {
      if (currentRole.name == role.name) {
        this.userRoles.splice(index, 1)
      }
    })
  }


  public addRole(): void {
    let alreadyHasRole = false;

    this.userRoles?.forEach(currentRole => {
      if (currentRole.name == this.createForm?.form.controls["role"].value) {
        alreadyHasRole = true
      }
    });

    if (!alreadyHasRole) {
      this.roles.forEach(currentRole => {
        if (currentRole.name == this.createForm?.form.controls["role"].value) {
          this.userRoles?.push(currentRole)
        }
      });
    }
  }
}
