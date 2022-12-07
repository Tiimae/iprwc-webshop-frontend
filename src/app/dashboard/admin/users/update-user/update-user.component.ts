import {Component, OnInit, ViewChild} from '@angular/core';
import {ActivatedRoute, Router} from "@angular/router";
import * as CryptoJs from 'crypto-js';
import {ApiConnectorService} from "../../../../_service/api-connector.service";
import {ApiMethodsService} from "../../../../_service/api-methods.service";
import {UserModel} from "../../../../_models/user.model";
import {FormControl, FormGroup, NgForm, Validators} from "@angular/forms";
import {RoleModel} from "../../../../_models/role.model";
import {UserDataService} from "../../../../_service/data/userData.service";
import {RoleDataService} from "../../../../_service/data/roleData.service";

@Component({
  selector: 'app-update-user',
  templateUrl: './update-user.component.html',
  styleUrls: ['./update-user.component.scss']
})
export class UpdateUserComponent implements OnInit {

  userId: string = "";
  user!: UserModel | undefined;
  roles: RoleModel[] = []
  userRoles: RoleModel[] = []

  userEditForm = new FormGroup({
    firstname: new FormControl('', [Validators.required]),
    middlename: new FormControl('', [Validators.required]),
    lastname: new FormControl('', [Validators.required]),
    email: new FormControl('', [
      Validators.required,
      Validators.pattern(
        '^(?=.{1,64}@)[A-Za-z0-9_-]+(\\.[A-Za-z0-9_-]+)*@' +
        '[^-][A-Za-z0-9-]+(\\.[A-Za-z0-9-]+)*(\\.[A-Za-z]{2,})$'
      ),
    ]),
    role: new FormControl('', [Validators.required]),
  })

  constructor(private route: ActivatedRoute, private router: Router) {
  }

  ngOnInit(): void {
    this.route.params.subscribe(async (params) => {
      const currentUserId = params['userId'].replaceAll("*", "/");
      this.userId = CryptoJs.Rabbit.decrypt(currentUserId, await ApiConnectorService.getInstance().getDecryptKey()).toString(CryptoJs.enc.Utf8)

      UserDataService.getInstance()
        .getCurrentUser(this.userId)
        .subscribe(r => {
          if (r == undefined) {
            this.router.navigate(["dashboard", "admin", "users"])
          }

          this.user = r

          if (this.user != undefined) {
            this.userEditForm.controls.firstname.setValue(this.user.firstName);
            this.userEditForm.controls.middlename.setValue(this.user.middleName);
            this.userEditForm.controls.lastname.setValue(this.user.lastName);
            this.userEditForm.controls.email.setValue(this.user.email);

            if (this.user.roles.length != null) {
              this.userRoles = this.user.roles;
            }
          }
        })
    });

    RoleDataService.getInstance()
      .getAll()
      .subscribe(r => {
        this.roles = r;
      })

    this.userEditForm.controls.role.setValue(this.roles[0].name);
  }

  public onSubmit(): void {
    const firstname = this.userEditForm.controls.firstname.value;
    const middlename = this.userEditForm.controls.middlename.value;
    const lastname = this.userEditForm.controls.lastname.value;
    const email = this.userEditForm.controls.email.value;

    if (firstname == null || middlename == null || lastname == null || email == null || this.userRoles.length == null) {
      return
    }

    if (!this.userEditForm.valid) {
      return;
    }

    const user = new UserModel(
      this.userId,
      firstname,
      middlename,
      lastname,
      email,
      this.userRoles
    )

    UserDataService.getInstance().updateUser(user);
    this.router.navigate(['dashboard', 'admin', 'users'])

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

    this.userRoles?.forEach(currentRole => {
      if (currentRole.name == this.userEditForm.controls.role.value) {
        alreadyHasRole = true
      }
    });

    if (!alreadyHasRole) {
      this.roles.forEach(currentRole => {
        if (currentRole.name == this.userEditForm.controls.role.value) {
          this.userRoles?.push(currentRole)
        }
      });
    }
  }
}
