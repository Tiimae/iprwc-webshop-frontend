import {Component, OnInit} from '@angular/core';
import {FormControl, FormGroup, Validators} from '@angular/forms';
import {AxiosResponse} from 'axios';
import {ToastrService} from 'ngx-toastr';
import {AppComponent} from '../../app.component';
import {AuthService} from '../../_service/auth.service';
import {Title} from "@angular/platform-browser";

@Component({
  selector: 'app-forgot-password',
  templateUrl: './forgot-password.component.html',
  styleUrls: ['./forgot-password.component.scss']
})
export class ForgotPasswordComponent implements OnInit {
  public setNewPassword: FormGroup = new FormGroup({
    email: new FormControl('', [
      Validators.required,
      Validators.pattern(
        '^(?=.{1,64}@)[A-Za-z0-9_-]+(\\.[A-Za-z0-9_-]+)*@' +
          '[^-][A-Za-z0-9-]+(\\.[A-Za-z0-9-]+)*(\\.[A-Za-z]{2,})$'
      )
    ])
  });

  constructor(
    private authService: AuthService,
    private toastr: ToastrService,
    private title: Title
  ) {}

  ngOnInit(): void {
    this.title.setTitle("F1 Webshop | Forgot Password")
  }

  public onSubmit(): void {
    AppComponent.isLoading = true;

    const email: string = this.setNewPassword.controls['email'].value;

    if (email == null) {
      this.toastr.error('Something went wrong!', 'Failed');
      AppComponent.isLoading = false;
      return;
    }

    if (!this.setNewPassword.valid) {
      this.toastr.error('Something went wrong!', 'Failed');
      AppComponent.isLoading = false;
      return;
    }

    this.authService.forgotPassword(email).then((response: AxiosResponse) => {
      if (response.data.code == 202) {
        this.setNewPassword.reset();
        this.toastr.success('We have send you a email to change password');
      } else {
        this.toastr.error(response.data.payload.message, 'Failed');
      }
    });

    AppComponent.isLoading = false;
  }
}
