import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import * as CryptoJs from 'crypto-js';
import { ToastrService } from 'ngx-toastr';
import { AppComponent } from '../../../../app.component';
import { RoleModel } from '../../../../_models/role.model';
import { UserModel } from '../../../../_models/user.model';
import { ApiConnectorService } from '../../../../_service/_api/api-connector.service';
import { RoleDataService } from '../../../../_service/_data/roleData.service';
import { UserDataService } from '../../../../_service/_data/userData.service';
import {Title} from "@angular/platform-browser";

@Component({
  selector: 'app-update-user',
  templateUrl: './update-user.component.html',
  styleUrls: ['./update-user.component.scss']
})
export class UpdateUserComponent implements OnInit {
  public userId: string = '';
  public user!: UserModel;
  public roles: RoleModel[] = [];
  public userRoles: RoleModel[] = [];

  public userEditForm = new FormGroup({
    firstname: new FormControl('', [Validators.required]),
    middlename: new FormControl(''),
    lastname: new FormControl('', [Validators.required]),
    email: new FormControl('', [
      Validators.required,
      Validators.pattern(
        '^(?=.{1,64}@)[A-Za-z0-9_-]+(\\.[A-Za-z0-9_-]+)*@' +
          '[^-][A-Za-z0-9-]+(\\.[A-Za-z0-9-]+)*(\\.[A-Za-z]{2,})$'
      )
    ]),
    role: new FormControl('', [Validators.required])
  });

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private userDataService: UserDataService,
    private roleDataService: RoleDataService,
    private toastr: ToastrService,
    private api: ApiConnectorService,
    private title: Title
  ) {}

  async ngOnInit(): Promise<void> {
    AppComponent.isLoading = false;

    this.route.params.subscribe(async (params) => {
      this.userId = params['userId']
      this.userDataService.getCurrentUser(this.userId).subscribe((r) => {
        if (r == undefined) {
          this.userDataService.getUserByRequest(this.userId).then((res) => {
            this.user = res.data.payload;
            this.setFormData();
          });
        } else {
          this.user = r;
          this.setFormData();
        }

        if (this.user != undefined) {
        }
      });
    });

    (await this.roleDataService.getAll()).subscribe((r) => {
      this.roles = r;
      this.userEditForm.controls.role.setValue(this.roles[0].name);
    });

    AppComponent.isLoading = false;
  }

  private setFormData(): void {
    this.userEditForm.controls.firstname.setValue(this.user.firstName);
    this.userEditForm.controls.middlename.setValue(this.user.middleName);
    this.userEditForm.controls.lastname.setValue(this.user.lastName);
    this.userEditForm.controls.email.setValue(this.user.email);

    if (this.user.roles.length != null) {
      this.userRoles = this.user.roles;
    }

    this.title.setTitle(`F1 Webshop | Update User - ${this.createUserName()}`)
  }

  public onSubmit(): void {
    AppComponent.isLoading = true;

    const firstname = this.userEditForm.controls.firstname.value;
    const middlename = this.userEditForm.controls.middlename.value;
    const lastname = this.userEditForm.controls.lastname.value;
    const email = this.userEditForm.controls.email.value;

    if (
      firstname == null ||
      lastname == null ||
      email == null ||
      this.userRoles.length == null
    ) {
      this.toastr.error('Something is wrong!', 'Failed');
      AppComponent.isLoading = false;
      return;
    }

    if (!this.userEditForm.valid) {
      this.toastr.error('Something is wrong!', 'Failed');
      AppComponent.isLoading = false;
      return;
    }

    if (this.user != undefined) {
      const user = new UserModel(
        this.userId,
        firstname,
        middlename == null ? '' : middlename,
        lastname,
        email,
        this.userRoles,
        this.user.addresses,
        []
      );

      this.userDataService.updateUser(user, true);

    }
    AppComponent.isLoading = false;
  }

  public removeRoleOutArray(role: string) {
    this.user?.roles.forEach((currentRole, index) => {
      if (currentRole.name == role) {
        this.user?.roles.splice(index, 1);
      }
    });
  }

  public addRole(): void {
    let alreadyHasRole = false;

    this.userRoles?.forEach((currentRole) => {
      if (currentRole.name == this.userEditForm.controls.role.value) {
        alreadyHasRole = true;
      }
    });

    if (!alreadyHasRole) {
      this.roles.forEach((currentRole) => {
        if (currentRole.name == this.userEditForm.controls.role.value) {
          this.userRoles?.push(currentRole);
        }
      });
    }
  }

  public createUserName(): string {
    let fullName = '';

    if (this.user?.middleName == '') {
      fullName = this.user?.firstName + ' ' + this.user?.lastName;
    } else {
      fullName =
        this.user?.firstName +
        ' ' +
        this.user?.middleName +
        ' ' +
        this.user?.lastName;
    }

    return fullName;
  }
}
