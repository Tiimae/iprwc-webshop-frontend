import {Component, OnInit, ViewChild} from '@angular/core';
import {Router} from "@angular/router";

import {faEnvelope, faKey, faUser} from "@fortawesome/free-solid-svg-icons";
import {NgForm} from "@angular/forms";
import {ApiConnectorService} from "../../_service/api-connector.service";
import {AuthService} from '../../_service/auth.service';

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

  constructor(private router: Router, private authService: AuthService) {
  }

  async ngOnInit() {
    const jwtToken = localStorage.getItem('blank-token');

    if (localStorage.getItem('blank-token') !== null) {
      try {
        const secret = await this.authService.getSecret();

        localStorage.clear();

        ApiConnectorService.getInstance().storeJwtToken(
          jwtToken ?? '',
          secret.data['message']
        );
      } catch (error) {
        localStorage.clear();
      }
    }

    if (localStorage.getItem('jwt-token')) {
      try {
        const tokenPayload = await ApiConnectorService.getInstance().getJwtPayload();
        if (tokenPayload !== undefined) {
          this.router.navigate(['/']);
        }
      } catch (err) {
      }
    }
  }

  async onSubmit() {

    await this.authService.register(
      this.signupForm?.form.controls['firstname'].value,
      this.signupForm?.form.controls['middlename'].value,
      this.signupForm?.form.controls['lastname'].value,
      this.signupForm?.form.controls['email'].value,
      this.signupForm?.form.controls['password'].value
    ).then(r => {
      this.router.navigate(['login'])
    });

  }

}
