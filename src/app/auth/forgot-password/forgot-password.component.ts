import { Component, OnInit } from '@angular/core';
import {FormControl, FormGroup, Validators} from "@angular/forms";
import {AuthService} from "../../_service/auth.service";
import {AxiosResponse} from "axios";
import {ToastrService} from "ngx-toastr";
import {AppComponent} from "../../app.component";

@Component({
  selector: 'app-forgot-password',
  templateUrl: './forgot-password.component.html',
  styleUrls: ['./forgot-password.component.scss']
})
export class ForgotPasswordComponent implements OnInit {

  setNewPassword = new FormGroup({
    email: new FormControl('', [
      Validators.required,
      Validators.pattern(
        '^(?=.{1,64}@)[A-Za-z0-9_-]+(\\.[A-Za-z0-9_-]+)*@' +
        '[^-][A-Za-z0-9-]+(\\.[A-Za-z0-9-]+)*(\\.[A-Za-z]{2,})$'
      ),
    ]),
  })

  constructor(
    private authService: AuthService,
    private toastr: ToastrService
  ) { }

  ngOnInit(): void {
  }

  onSubmit(): void {
    AppComponent.isLoading = true;

    const email = this.setNewPassword.controls.email.value;

    if (email == null) {
      this.toastr.error("Something went wrong!", "Failed");
      AppComponent.isLoading = false;
      return;
    }
    if (!this.setNewPassword.valid) {
      this.toastr.error("Something went wrong!", "Failed");
      AppComponent.isLoading = false;
      return;
    }

    this.authService
      .forgotPassword(email)
      .then((response: AxiosResponse) => {
        if (response.data.code == 202) {
          this.setNewPassword.reset();
          this.toastr.success("We have send you a email to change password")
        }
        else {
          this.toastr.error(response.data.payload.message, "Failed");
        }
      });

    AppComponent.isLoading = false;
  }

}
