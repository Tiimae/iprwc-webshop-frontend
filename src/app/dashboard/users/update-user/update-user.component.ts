import {Component, OnInit, ViewChild} from '@angular/core';
import {ActivatedRoute, Router} from "@angular/router";
import * as CryptoJs from 'crypto-js';
import {ApiConnectorService} from "../../../_service/api-connector.service";
import {ApiMethodsService} from "../../../_service/api-methods.service";
import {UserModel} from "../../../_models/user.model";
import {NgForm} from "@angular/forms";
import {RoleModel} from "../../../_models/role.model";

@Component({
  selector: 'app-update-user',
  templateUrl: './update-user.component.html',
  styleUrls: ['./update-user.component.scss']
})
export class UpdateUserComponent implements OnInit {

  userId: string | null = null;
  user: UserModel | undefined = undefined;
  roles: RoleModel[] = []

  @ViewChild('f') updateForm: NgForm | undefined;

  constructor(private route: ActivatedRoute, private router: Router) {
  }

  ngOnInit(): void {
    this.route.params.subscribe((params) => {
      if (ApiConnectorService.getInstance().decryptKey != null) {
        const currentUserId = params['userId'].replaceAll("*", "/");
        // @ts-ignore
        this.userId = CryptoJs.Rabbit.decrypt(currentUserId, ApiConnectorService.getInstance().decryptKey).toString(CryptoJs.enc.Utf8)
      }
    });

    ApiMethodsService.getInstance().get("user/" + this.userId + "/roles", true).then(r => {
      this.user = r.data?.payload as UserModel;
      this.setFormData();
    });

    ApiMethodsService.getInstance().get("role", true).then(r => {
      r.data.payload.forEach((role: RoleModel) => {
        this.roles.push(role as RoleModel)
      });
    });

    this.setFormData()
  }

  public setFormData(): void {
    this.updateForm?.form.controls['firstname'].setValue(this.user?.firstName);
    this.updateForm?.form.controls['middlename'].setValue(this.user?.middleName);
    this.updateForm?.form.controls['lastname'].setValue(this.user?.lastName);
    this.updateForm?.form.controls['email'].setValue(this.user?.email);
  }

  public onSubmit(): void {
    let roleIds: string[] = [];

    this.user?.roles.forEach(roles => {
      roleIds.push(roles.id)
    })

    const payload = {
      firstName: this.updateForm?.form.controls['firstname'].value,
      middleName: this.updateForm?.form.controls['middlename'].value,
      lastName: this.updateForm?.form.controls['lastname'].value,
      email: this.updateForm?.form.controls['email'].value,
      password: "",
      roleIds: roleIds,
      orderIds: [],
      userAddressIds: []
    }

    ApiMethodsService.getInstance().put("/user/" + this.userId, payload, true).then(r => {
      alert("User has been updated");
      this.router.navigate(["dashboard", "users"]);
    })

  }

  public getAllUserRoles(): RoleModel[] | undefined {
    return this.user?.roles == [] ? [] : this.user?.roles;
  }

  public removeRoleOutArray(role: RoleModel) {
    this.user?.roles.forEach((currentRole, index) => {
      if (currentRole.name == role.name) {
        this.user?.roles.splice(index, 1)
      }
    })
  }

  public addRole(): void {
    let alreadyHasRole = false;

    this.user?.roles.forEach(currentRole => {
      if (currentRole.name == this.updateForm?.form.controls["role"].value) {
        alreadyHasRole = true
      }
    });

    if (!alreadyHasRole) {
      this.roles.forEach(currentRole => {
        if (currentRole.name == this.updateForm?.form.controls["role"].value) {
          this.user?.roles.push(currentRole)
        }
      });
    }
  }

}
