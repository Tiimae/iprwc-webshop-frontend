import {Component, OnInit} from '@angular/core';
import {Router} from '@angular/router';

import {AbstractControl, FormControl, FormGroup, Validators} from '@angular/forms';
import {ToastrService} from 'ngx-toastr';
import {AppComponent} from '../../app.component';
import {AuthService} from '../../_service/auth.service';
import {ApiConnectorService} from '../../_service/_api/api-connector.service';
import {Title} from "@angular/platform-browser";
import {AxiosResponse} from "axios";

@Component({
  selector: 'app-registration',
  templateUrl: './registration.component.html',
  styleUrls: ['./registration.component.scss']
})
export class RegistrationComponent implements OnInit {

  private passRequirement = {
    passwordMinLowerCase: 1,
    passwordMinNumber: 1,
    passwordMinSymbol: 1,
    passwordMinUpperCase: 1,
    passwordMinCharacters: 8
  };

  private pattern: RegExp = new RegExp([
    `(?=([^a-z]*[a-z])\{${this.passRequirement.passwordMinLowerCase},\})`,
    `(?=([^A-Z]*[A-Z])\{${this.passRequirement.passwordMinUpperCase},\})`,
    `(?=([^0-9]*[0-9])\{${this.passRequirement.passwordMinNumber},\})`,
    `(?=(\.\*[\$\@\$\!\%\*\?\&\#])\{${this.passRequirement.passwordMinSymbol},\})`,
    `[A-Za-z\\d\$\@\$\!\%\*\?\&\#\.]{${
      this.passRequirement.passwordMinCharacters
    },}`
  ]
    .map(item => item.toString())
    .join(""));

  public firstRegistrationForm: FormGroup = new FormGroup({
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
    password: new FormControl('', [Validators.required]),
    passwordCheck: new FormControl('', [Validators.required]),
  });

  constructor(
    private router: Router,
    private authService: AuthService,
    private toastr: ToastrService,
    private api: ApiConnectorService,
    private title: Title
  ) {
  }

  ngOnInit() {
    AppComponent.isLoading = true;

    if (localStorage.getItem('jwt-token')) {
      try {
        const tokenPayload: any = this.api.getJwtPayload();
        if (tokenPayload !== undefined) {
          this.router.navigate(['/']);
        }
      } catch (err) {
      }
    }

    this.title.setTitle("F1 Webshop | Register")

    console.log(this.pattern.source)

    AppComponent.isLoading = false;
  }

  public onSubmit(): void {
    AppComponent.isLoading = true;
    const firstname: string =
      this.firstRegistrationForm.controls['firstname'].value;
    const middlename: string =
      this.firstRegistrationForm.controls['middlename'].value;
    const lastname: string =
      this.firstRegistrationForm.controls['lastname'].value;
    const email: string = this.firstRegistrationForm.controls['email'].value;
    const password: string =
      this.firstRegistrationForm.controls['password'].value;
    const passwordCheck: string =
      this.firstRegistrationForm.controls['passwordCheck'].value;

    if (firstname == null || lastname == null || email == null || password == null || passwordCheck == null) {
      this.toastr.error('Something went wrong!', 'Failed');
      AppComponent.isLoading = false;
      this.firstRegistrationForm.reset();
      return;
    }

    if (password !== passwordCheck) {
      this.toastr.error("Passwords doesn't match", 'Failed');
      AppComponent.isLoading = false;
      this.firstRegistrationForm.reset();
      return;
    }

    if (!this.pattern.test(password)) {
      this.toastr.error(`Password needs at least ${this.passRequirement.passwordMinCharacters} characters, ${this.passRequirement.passwordMinNumber} numbers, ${this.passRequirement.passwordMinLowerCase} lowercase letter, ${this.passRequirement.passwordMinUpperCase} uppercase characters and ${this.passRequirement.passwordMinSymbol} special characters!`)
      AppComponent.isLoading = false;
      this.firstRegistrationForm.reset();
      return;
    }

    if (!this.firstRegistrationForm.valid) {
      this.toastr.error('Something went wrong!', 'Failed');
      AppComponent.isLoading = false;
      this.firstRegistrationForm.reset();
      return;
    }

    this.authService
      .register(firstname, middlename, lastname, email, password)
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

  public onFocus(name: string): void {
    document.querySelectorAll("[data-input]").forEach(type => {
      const value: string | null = type.getAttribute("data-input")
      if (value === name) {
        if (type.classList.contains("label-up") && this.firstRegistrationForm.controls[name].value == '') {
          type.classList.remove("label-up")
        } else {
          type.classList.add("label-up")
        }

        return;
      }
    })
  }

  public onChange(): void {
    const element = document.querySelector("[data-submit-button]");
    if (element != null) {
      if (this.firstRegistrationForm.valid && element.classList.contains("disabled")) {
        element.classList.remove("disabled");
      } else if (!this.firstRegistrationForm.valid && !element.classList.contains("disabled")) {
        element.classList.add("disabled");
      }
    }
  }
}
