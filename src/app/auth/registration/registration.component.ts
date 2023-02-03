import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

import { FormControl, FormGroup, Validators } from '@angular/forms';
import { AxiosResponse } from 'axios';
import { ToastrService } from 'ngx-toastr';
import { AppComponent } from '../../app.component';
import { ApiConnectorService } from '../../_service/api-connector.service';
import { AuthService } from '../../_service/auth.service';

@Component({
  selector: 'app-registration',
  templateUrl: './registration.component.html',
  styleUrls: ['./registration.component.scss']
})
export class RegistrationComponent implements OnInit {
  public step: number = 1;

  public firstRegistrationForm: FormGroup = new FormGroup({
    firstname: new FormControl('', [Validators.required]),
    middlename: new FormControl(''),
    lastname: new FormControl('', [Validators.required])
  });

  public secondRegistrationForm: FormGroup = new FormGroup({
    email: new FormControl('', [
      Validators.required,
      Validators.pattern(
        '^(?=.{1,64}@)[A-Za-z0-9_-]+(\\.[A-Za-z0-9_-]+)*@' +
          '[^-][A-Za-z0-9-]+(\\.[A-Za-z0-9-]+)*(\\.[A-Za-z]{2,})$'
      )
    ]),
    password: new FormControl('', [Validators.required]),
    passwordCheck: new FormControl('', [Validators.required]),
    terms: new FormControl('', [Validators.required])
  });

  public firstname: string = '';
  public middlename: string = '';
  public lastname: string = '';

  constructor(
    private router: Router,
    private authService: AuthService,
    private toastr: ToastrService,
    private api: ApiConnectorService
  ) {}

  async ngOnInit() {
    AppComponent.isLoading = true;

    if (localStorage.getItem('jwt-token')) {
      try {
        const tokenPayload: any = await this.api.getJwtPayload();
        if (tokenPayload !== undefined) {
          this.router.navigate(['/']);
        }
      } catch (err) {}
    }

    AppComponent.isLoading = false;
  }

  toNextStep(): void {
    AppComponent.isLoading = true;

    const firstname: string =
      this.firstRegistrationForm.controls['firstname'].value;
    const middlename: string =
      this.firstRegistrationForm.controls['middlename'].value;
    const lastname: string =
      this.firstRegistrationForm.controls['lastname'].value;

    if (firstname == null || lastname == null) {
      this.toastr.error('Something went wrong!', 'Failed');
      AppComponent.isLoading = false;
      return;
    }

    if (!this.firstRegistrationForm.valid) {
      this.toastr.error('Something went wrong!', 'Failed');
      AppComponent.isLoading = false;
      return;
    }

    this.firstname = firstname;
    if (middlename != null) {
      this.middlename = middlename;
    }
    this.lastname = lastname;
    this.step = 2;

    AppComponent.isLoading = false;
  }

  async onSubmit() {
    AppComponent.isLoading = true;
    const email: string = this.secondRegistrationForm.controls['email'].value;
    const password: string =
      this.secondRegistrationForm.controls['password'].value;
    const passwordCheck: string =
      this.secondRegistrationForm.controls['passwordCheck'].value;

    if (email == null || password == null || passwordCheck == null) {
      this.toastr.error('Something went wrong!', 'Failed');
      AppComponent.isLoading = false;
      return;
    }

    if (!this.secondRegistrationForm.controls['terms'].valid) {
      this.toastr.error('Accept the terms and conditions', 'Failed');
      AppComponent.isLoading = false;
      return;
    }

    if (password !== passwordCheck) {
      this.toastr.error("Passwords doesn't match", 'Failed');
      AppComponent.isLoading = false;
      return;
    }

    if (!this.secondRegistrationForm.valid) {
      this.toastr.error('Something went wrong!', 'Failed');
      AppComponent.isLoading = false;
      return;
    }

    await this.authService
      .register(this.firstname, this.middlename, this.lastname, email, password)
      .then((r: AxiosResponse) => {
        if (r.data.code == 202) {
          this.router.navigate(['auth', 'login']);
          this.toastr.success(
            'User has been created successfully!',
            r.data.message
          );
        } else {
          this.toastr.error(r.data.payload, r.data.message);
        }
      });

    AppComponent.isLoading = false;
  }
}
