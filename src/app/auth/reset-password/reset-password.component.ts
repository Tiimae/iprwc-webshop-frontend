import {Component, OnInit} from '@angular/core';
import {FormControl, FormGroup, Validators} from '@angular/forms';
import {ActivatedRoute, Router} from '@angular/router';
import {AxiosResponse} from 'axios';
import {ToastrService} from 'ngx-toastr';
import {AppComponent} from '../../app.component';
import {AuthService} from '../../_service/auth.service';
import {Title} from "@angular/platform-browser";

@Component({
  selector: 'app-reset-password',
  templateUrl: './reset-password.component.html',
  styleUrls: ['./reset-password.component.scss']
})
export class ResetPasswordComponent implements OnInit {
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

  private token: string | null = null;
  public resetPasswordForm: FormGroup = new FormGroup({
    email: new FormControl('', [
      Validators.required,
      Validators.pattern(
        '^(?=.{1,64}@)[A-Za-z0-9_-]+(\\.[A-Za-z0-9_-]+)*@' +
          '[^-][A-Za-z0-9-]+(\\.[A-Za-z0-9-]+)*(\\.[A-Za-z]{2,})$'
      )
    ]),
    password: new FormControl('', [Validators.required]),
    passwordCheck: new FormControl('', [Validators.required])
  });

  constructor(
    private authService: AuthService,
    private router: Router,
    private route: ActivatedRoute,
    private toastr: ToastrService,
    private title: Title
  ) {}

  ngOnInit(): void {
    AppComponent.isLoading = true;
    this.token = this.route.snapshot.queryParamMap.get('token');

    if (this.token == null) {
      this.router.navigate(['/']);
    }

    this.title.setTitle("F1 Webshop | Reset Password")
    AppComponent.isLoading = false;
  }

  public onSubmit(): void {
    AppComponent.isLoading = true;
    const email: string = this.resetPasswordForm.controls['email'].value;
    const password: string = this.resetPasswordForm.controls['password'].value;
    const passwordCheck: string =
      this.resetPasswordForm.controls['passwordCheck'].value;

    if (
      email == null ||
      password == null ||
      passwordCheck == null ||
      this.token == null
    ) {
      this.toastr.error('Something went wrong!', 'Failed');
      AppComponent.isLoading = false;
      this.resetPasswordForm.reset();
      return;
    }

    if (password !== passwordCheck) {
      this.toastr.error("Passwords doesn't match!", 'Failed');
      AppComponent.isLoading = false;
      this.resetPasswordForm.reset();
      return;
    }

    if (!this.pattern.test(password)) {
      this.toastr.error(`Password needs at least ${this.passRequirement.passwordMinCharacters} characters, ${this.passRequirement.passwordMinNumber} numbers, ${this.passRequirement.passwordMinLowerCase} lowercase letter, ${this.passRequirement.passwordMinUpperCase} uppercase characters and ${this.passRequirement.passwordMinSymbol} special characters!`)
      AppComponent.isLoading = false;
      this.resetPasswordForm.reset();
      return;
    }

    if (!this.resetPasswordForm.valid) {
      this.toastr.error('Something went wrong!', 'Failed');
      AppComponent.isLoading = false;
      this.resetPasswordForm.reset();
      return;
    }

    this.authService
      .setNewPassword(this.token, email, password)
      .then((response: AxiosResponse) => {
        if (response.data.code == 200) {
          this.resetPasswordForm.reset();
          this.toastr.success('Password has been reset!', 'Success');
          setTimeout(() => {
            this.router.navigate(['auth', 'login']);
          }, 2000);
        } else {
          this.toastr.error(response.data.payload.message, 'Failed');
        }
      });

    AppComponent.isLoading = false;
  }
}
