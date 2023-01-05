import {Component, OnInit} from '@angular/core';
import {FormControl, FormGroup, Validators} from "@angular/forms";
import {AuthService} from "../../_service/auth.service";
import {ActivatedRoute, Router} from "@angular/router";
import {AxiosResponse} from "axios";
import {ToastrService} from "ngx-toastr";

@Component({
  selector: 'app-reset-password',
  templateUrl: './reset-password.component.html',
  styleUrls: ['./reset-password.component.scss']
})
export class ResetPasswordComponent implements OnInit {

  token: string | null = null;
  resetPasswordForm = new FormGroup({
    email: new FormControl('', [
      Validators.required,
      Validators.pattern(
        '^(?=.{1,64}@)[A-Za-z0-9_-]+(\\.[A-Za-z0-9_-]+)*@' +
        '[^-][A-Za-z0-9-]+(\\.[A-Za-z0-9-]+)*(\\.[A-Za-z]{2,})$'
      ),
    ]),
    password: new FormControl('', [Validators.required]),
    passwordCheck: new FormControl('', [Validators.required]),
  })

  constructor(private authService: AuthService, private router: Router, private route: ActivatedRoute, private toastr: ToastrService) {
  }

  ngOnInit(): void {
    this.token = this.route.snapshot.queryParamMap.get('token');

    if (this.token == null) {
      this.router.navigate(["/"])
    }
  }

  onSubmit(): void {
    const email = this.resetPasswordForm.controls.email.value;
    const password = this.resetPasswordForm.controls.password.value;
    const passwordCheck = this.resetPasswordForm.controls.passwordCheck.value;

    if (email == null || password == null || passwordCheck == null || this.token == null) {
      this.toastr.error("Something went wrong!", "Failed");
      return;
    }

    if (password !== passwordCheck) {
      this.toastr.error("Passwords doesn't match!", "Failed");
      return;
    }

    if (!this.resetPasswordForm.valid) {
      this.toastr.error("Something went wrong!", "Failed");
      return;
    }

    this.authService
      .setNewPassword(this.token, email, password)
      .then((response: AxiosResponse) => {

        if (response.data.code == 200) {
          this.resetPasswordForm.reset();
          this.toastr.success("Password has been reset!", "Success");
          setTimeout(() => {
            this.router.navigate(['auth', 'login']);
          }, 2000);
        } else {
          this.toastr.error(response.data.payload.message, "Failed")
        }

      });
  }
}
