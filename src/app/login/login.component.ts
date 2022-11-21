import { Component, OnInit } from '@angular/core';
import {AuthService} from "../service/auth.service";
import {ApiConnectorService} from "../service/api-connector.service";
import {Router} from "@angular/router";

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  emailField = 'de.kok.ac@gmail.com';
  passwordField = 'Test123';

  constructor(private router: Router,) { }

  ngOnInit(): void {
  }

  public LogUserIn() {
    new AuthService().login(this.emailField, this.passwordField).then(r => {
      if (r.data.payload.jwtToken != null && r.data.payload.userId != null) {
        ApiConnectorService.getInstance().storeJwtToken(r.data.payload.jwtToken);
        ApiConnectorService.getInstance().storeUserId(r.data.payload.userId);

        this.router.navigate(['/'])
      }


    });
  }

}
