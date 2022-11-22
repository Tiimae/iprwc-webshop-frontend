import {Component, OnInit, ViewChild} from '@angular/core';
import {Router} from "@angular/router";

import {faKey, faEnvelope, faUser} from "@fortawesome/free-solid-svg-icons";
import {NgForm} from "@angular/forms";
import {ApiConnectorService} from "../service/api-connector.service";
import {AuthService} from '../service/auth.service';

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

  constructor(private router: Router) {
  }

  ngOnInit(): void {
  }

  public onSubmit() {
    new AuthService().register(
      this.signupForm?.form.controls['firstname'].value,
      this.signupForm?.form.controls['middlename'].value,
      this.signupForm?.form.controls['lastname'].value,
      this.signupForm?.form.controls['email'].value,
      this.signupForm?.form.controls['password'].value
    ).then(r => {
      if (r.data.payload.jwtToken != null && r.data.payload.userId != null) {
        ApiConnectorService.getInstance().storeJwtToken(r.data.payload.jwtToken);
        ApiConnectorService.getInstance().storeUserId(r.data.payload.userId);

        this.router.navigate(['/']).then(r => {
          window.location.reload();
        })
      }
    });
  }

}
