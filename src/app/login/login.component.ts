import {Component, OnInit, ViewChild} from '@angular/core';
import {AuthService} from "../service/auth.service";
import {ApiConnectorService} from "../service/api-connector.service";
import {Router} from "@angular/router";

import {faKey, faEnvelope} from "@fortawesome/free-solid-svg-icons";
import {NgForm} from "@angular/forms";

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  // emailField = 'de.kok.ac@gmail.com';
  // passwordField = 'Test123';

  faKey = faKey;
  faEnvelope = faEnvelope;

  @ViewChild('f') loginForm: NgForm | undefined;

  constructor(private router: Router,) { }

  ngOnInit(): void {
  }

  public onSubmit() {
    new AuthService().login(
      this.loginForm?.form.controls['email'].value,
      this.loginForm?.form.controls['password'].value
    ).then(r => {
      if (r.data.payload.jwtToken != null && r.data.payload.userId != null) {
        ApiConnectorService.getInstance().storeJwtToken(r.data.payload.jwtToken);
        ApiConnectorService.getInstance().storeUserId(r.data.payload.userId);

        this.router.navigate(['/'])
      }


    });
  }

}
