import {Component, OnInit} from '@angular/core';
import {FormControl, FormGroup, Validators} from '@angular/forms';
import {Router} from '@angular/router';
import {ToastrService} from 'ngx-toastr';
import {AppComponent} from '../../../../app.component';
import {RoleModel} from '../../../../_models/role.model';
import {UserModel} from '../../../../_models/user.model';
import {RoleDataService} from '../../../../_service/_data/roleData.service';
import {UserDataService} from '../../../../_service/_data/userData.service';
import {Title} from "@angular/platform-browser";

@Component({
  selector: 'app-create-user',
  templateUrl: './create-user.component.html',
  styleUrls: ['./create-user.component.scss']
})
export class CreateUserComponent implements OnInit {
  public roles: RoleModel[] = [];
  public userRoles: RoleModel[] = [];

  public userCreateForm: FormGroup = new FormGroup({
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
    private router: Router,
    private userDataService: UserDataService,
    private roleDataService: RoleDataService,
    private toastr: ToastrService,
    private title: Title
  ) {}

  async ngOnInit(): Promise<void> {
    AppComponent.isLoading = true;

    (await this.roleDataService.getAll()).subscribe((r) => {
      this.roles = r;
    });

    this.title.setTitle("F1 Webshop | Create User");

    AppComponent.isLoading = false;
  }

  public onSubmit(): void {
    AppComponent.isLoading = true;

    const firstname = this.userCreateForm.controls['firstname'].value;
    const middlename = this.userCreateForm.controls['middlename'].value;
    const lastname = this.userCreateForm.controls['lastname'].value;
    const email = this.userCreateForm.controls['email'].value;

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

    if (!this.userCreateForm.valid) {
      this.toastr.error('Something is wrong!', 'Failed');
      AppComponent.isLoading = false;
      return;
    }

    const user = new UserModel(
      '',
      firstname,
      middlename == null ? '' : middlename,
      lastname,
      email,
      this.userRoles,
      [],
      []
    );

    this.userDataService.createNewUser(user);

    AppComponent.isLoading = false;
  }

  public removeRoleOutArray(event: string) {
    this.userRoles.forEach((currentRole, index) => {
      if (currentRole.name == event) {
        this.userRoles.splice(index, 1);
      }
    });
  }

  public addRole(): void {
    let alreadyHasRole = false;

    this.userRoles?.forEach((currentRole) => {
      if (currentRole.name == this.userCreateForm.controls['role'].value) {
        alreadyHasRole = true;
      }
    });

    if (!alreadyHasRole) {
      this.roles.forEach((currentRole) => {
        if (currentRole.name == this.userCreateForm.controls['role'].value) {
          this.userRoles?.push(currentRole);
        }
      });
    }
  }
}
