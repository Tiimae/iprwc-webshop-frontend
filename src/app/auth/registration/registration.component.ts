import {Component, OnInit, ViewChild} from '@angular/core';
import {Router} from "@angular/router";

import {faEnvelope, faKey, faUser} from "@fortawesome/free-solid-svg-icons";
import {NgForm} from "@angular/forms";
import {ApiConnectorService} from "../../_service/api-connector.service";
import {AuthService} from '../../_service/auth.service';
import {ToastrService} from "ngx-toastr";

@Component({
  selector: 'app-registration',
  templateUrl: './registration.component.html',
  styleUrls: ['./registration.component.scss']
})
export class RegistrationComponent implements OnInit {

  faKey = faKey;
  faEnvelope = faEnvelope;
  faUser = faUser;

  @ViewChild('f') signupForm: NgForm | undefined;

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

  async onSubmit() {
    const firstName = this.signupForm?.form.controls['firstname'].value
    const middleName =this.signupForm?.form.controls['middlename'].value
    const lastName = this.signupForm?.form.controls['lastname'].value
    const email = this.signupForm?.form.controls['email'].value
    const password = this.signupForm?.form.controls['password'].value

    if (firstName == null || lastName == null || email == null || password == null) {
      return;
    }

    await this.authService.register(
      firstName,
      middleName,
      lastName,
      email,
      password
    ).then(r => {
      if (r.data.code == 202) {
        localStorage.setItem('blank-token', r.data?.payload?.jwtToken);
        window.location.href = ApiConnectorService.apiUrl + r.data['payload']['destination'];
        this.toastr.success("User has been created successfully!", r.data.message);
      } else {
        this.toastr.error(r.data.payload, r.data.message);
      }
    });

  }

}
