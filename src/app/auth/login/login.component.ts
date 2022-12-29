import {Component, OnInit, ViewChild} from '@angular/core';
import {AuthService} from "../../_service/auth.service";
import {ApiConnectorService} from "../../_service/api-connector.service";
import {Router} from "@angular/router";

import {faEnvelope, faKey} from "@fortawesome/free-solid-svg-icons";
import {FormControl, FormGroup, NgForm, Validators} from "@angular/forms";
import {ToastrService} from 'ngx-toastr';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  faKey = faKey;
  faEnvelope = faEnvelope;

  loginForm = new FormGroup({
    email: new FormControl('', [
      Validators.required,
      Validators.pattern(
        '^(?=.{1,64}@)[A-Za-z0-9_-]+(\\.[A-Za-z0-9_-]+)*@' +
        '[^-][A-Za-z0-9-]+(\\.[A-Za-z0-9-]+)*(\\.[A-Za-z]{2,})$'
      ),
    ]),
    password: new FormControl('', [Validators.required]),
  })

  constructor(
    private router: Router,
    private authService: AuthService,
    private toastr: ToastrService,
    private api: ApiConnectorService
  ) {
  }

  async ngOnInit() {
    const jwtToken = localStorage.getItem('blank-token');

    if (localStorage.getItem('blank-token') !== null) {
      try {
        const secret = await this.authService.getSecret();

        localStorage.clear();

        this.api.storeJwtToken(
          jwtToken ?? '',
          secret.data['message']
        );
      } catch (error) {
        localStorage.clear();
      }
    }

    if (localStorage.getItem('jwt-token')) {
      try {
        const tokenPayload = await this.api.getJwtPayload();
        if (tokenPayload !== undefined) {
          this.router.navigate(['/']);
        }
      } catch (err) {
      }
    }
  }

  public async onSubmit() {

    const email = this.loginForm.controls.email.value
    const password = this.loginForm.controls.password.value

    if (email == null || password == null) {
      this.toastr.error("Something went wrong!", "Failed");
      return;
    }

    if (!this.loginForm.value) {
      this.toastr.error("Something went wrong!", "Failed");
      return;
    }

    await this.authService.login(
      email,
      password
    ).then(r => {
      if (r.data.code == 202) {
        localStorage.setItem('blank-token', r.data.payload?.jwtToken);
        window.location.href = ApiConnectorService.apiUrl + r.data['payload']['destination'];
        this.toastr.success("You are Logged in successfully!", r.data.message);
      } else {
        this.toastr.error("Credentials doesnt match!", r.data.message);
      }
    })
  }
}
