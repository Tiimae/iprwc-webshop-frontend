import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { AppComponent } from '../../../app.component';
import { UserModel } from '../../../_models/user.model';
import { ApiConnectorService } from '../../../_service/api-connector.service';
import { UserDataService } from '../../../_service/data/userData.service';

@Component({
  selector: 'app-account',
  templateUrl: './account.component.html',
  styleUrls: ['./account.component.scss'],
})
export class AccountComponent implements OnInit {
  user!: UserModel;
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
  });

  constructor(
    private router: Router,
    private userDataService: UserDataService,
    private api: ApiConnectorService,
    private toastr: ToastrService
  ) {}

  ngOnInit(): void {
    AppComponent.isLoading = true;

    this.api.getJwtPayload().then((payload) => {
      this.userDataService.getCurrentUser(payload.userId).subscribe((r) => {
        if (r == undefined) {
          this.userDataService.getUserByRequest(payload.userId).then((res) => {
            this.user = res.data.payload;
            this.setFormData();
          });
        } else {
          this.user = r;
          this.setFormData();
        }
      });
    });

    AppComponent.isLoading = false;
  }

  public setFormData(): void {
    this.userEditForm.controls.firstname.setValue(this.user.firstName);
    this.userEditForm.controls.middlename.setValue(this.user.middleName);
    this.userEditForm.controls.lastname.setValue(this.user.lastName);
    this.userEditForm.controls.email.setValue(this.user.email);
  }

  onSubmit(): void {
    AppComponent.isLoading = true;

    const firstname = this.userEditForm.controls.firstname.value;
    const middlename = this.userEditForm.controls.middlename.value;
    const lastname = this.userEditForm.controls.lastname.value;
    const email = this.userEditForm.controls.email.value;

    if (firstname == null || lastname == null || email == null) {
      this.toastr.error('Something is wrong!', 'Failed');
      AppComponent.isLoading = false;
      return;
    }

    if (!this.userEditForm.valid) {
      this.toastr.error('Something is wrong!', 'Failed');
      AppComponent.isLoading = false;
      return;
    }

    if (this.user == undefined) {
      this.router.navigate(['']);
      AppComponent.isLoading = false;
      return;
    }

    const user = new UserModel(
      this.user.id,
      firstname,
      middlename == null ? '' : middlename,
      lastname,
      email,
      this.user.roles,
      this.user.addresses,
      this.user.orders
    );

    const request: boolean = this.userDataService.updateUser(user, false);

    if (request) {
      this.toastr.success('User has been updated successfully!', 'Created');
    }

    AppComponent.isLoading = false;
  }
}
