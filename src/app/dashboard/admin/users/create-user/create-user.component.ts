import {Component, OnInit} from '@angular/core';
import {RoleModel} from "../../../../_models/role.model";
import {FormControl, FormGroup, Validators} from "@angular/forms";
import {Router} from "@angular/router";
import {UserModel} from "../../../../_models/user.model";
import {UserDataService} from "../../../../_service/data/userData.service";
import {RoleDataService} from "../../../../_service/data/roleData.service";

@Component({
  selector: 'app-create-user',
  templateUrl: './create-user.component.html',
  styleUrls: ['./create-user.component.scss']
})
export class CreateUserComponent implements OnInit {

  roles: RoleModel[] = []
  userRoles: RoleModel[] = []

  userCreateForm = new FormGroup({
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

  constructor(
    private router: Router,
    private userDataService: UserDataService,
    private roleDataService: RoleDataService,
  ) {
  }

  async ngOnInit(): Promise<void> {
    (await this.roleDataService
      .getAll())
      .subscribe(r => {
        this.roles = r;
      })
  }

  public onSubmit(): void {
    const firstname = this.userCreateForm.controls.firstname.value;
    const middlename = this.userCreateForm.controls.middlename.value;
    const lastname = this.userCreateForm.controls.lastname.value;
    const email = this.userCreateForm.controls.email.value;

    if (firstname == null || middlename == null || lastname == null || email == null || this.userRoles.length == null) {
      return
    }

    if (!this.userCreateForm.valid) {
      return;
    }

    const user = new UserModel(
      "",
      firstname,
      middlename,
      lastname,
      email,
      this.userRoles
    )

    this.userDataService.createNewUser(user);
    this.router.navigate(['dashboard', 'admin', 'users'])
  }

  public removeRoleOutArray(event: string) {
    this.userRoles.forEach((currentRole, index) => {
      if (currentRole.name == event) {
        this.userRoles.splice(index, 1)
      }
    })
  }


  public addRole(): void {
    let alreadyHasRole = false;

    this.userRoles?.forEach(currentRole => {
      if (currentRole.name == this.userCreateForm.controls.role.value) {
        alreadyHasRole = true
      }
    });

    if (!alreadyHasRole) {
      this.roles.forEach(currentRole => {
        if (currentRole.name == this.userCreateForm.controls.role.value) {
          this.userRoles?.push(currentRole)
        }
      });
    }
  }
}
