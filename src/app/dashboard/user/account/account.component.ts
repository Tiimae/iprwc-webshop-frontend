import {Component, OnInit} from '@angular/core';
import {FormControl, FormGroup, Validators} from "@angular/forms";
import {Router} from "@angular/router";
import {UserDataService} from "../../../_service/data/userData.service";
import {ToastrService} from "ngx-toastr";
import {UserModel} from "../../../_models/user.model";
import {ApiConnectorService} from "../../../_service/api-connector.service";

@Component({
  selector: 'app-account',
  templateUrl: './account.component.html',
  styleUrls: ['./account.component.scss']
})
export class AccountComponent implements OnInit {


  user!: UserModel | undefined;
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
  })


  constructor(
    private router: Router,
    private userDataService: UserDataService,
    private api: ApiConnectorService,
    private toastr: ToastrService
  ) {
  }

  ngOnInit(): void {
    this.api.getJwtPayload().then(payload => {
      setTimeout(() => {
        this.userDataService
          .getCurrentUser(payload.userId)
          .subscribe(r => {
            if (r == undefined) {
              this.router.navigate([""])
            }

            this.user = r

            if (this.user != undefined) {
              this.userEditForm.controls.firstname.setValue(this.user.firstName);
              this.userEditForm.controls.middlename.setValue(this.user.middleName);
              this.userEditForm.controls.lastname.setValue(this.user.lastName);
              this.userEditForm.controls.email.setValue(this.user.email);

            }
          })
      }, 200)
    });
  }

  onSubmit(): void {
    const firstname = this.userEditForm.controls.firstname.value;
    const middlename = this.userEditForm.controls.middlename.value;
    const lastname = this.userEditForm.controls.lastname.value;
    const email = this.userEditForm.controls.email.value;

    if (firstname == null || middlename == null || lastname == null || email == null) {
      this.toastr.error('Something is wrong!', 'Failed');
      return
    }

    if (!this.userEditForm.valid) {
      this.toastr.error('Something is wrong!', 'Failed');
      return;
    }

    if (this.user == undefined) {
      this.router.navigate([""])
      return;
    }

    const user = new UserModel(
      this.user.id,
      firstname,
      middlename,
      lastname,
      email,
      this.user.roles,
      this.user.addresses,
      this.user.orders
    )

    const request: boolean = this.userDataService.updateUser(user);

    if (request) {
      this.toastr.success("User has been updated successfully!", "Created");
    }
  }

}
