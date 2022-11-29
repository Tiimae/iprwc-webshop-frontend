import {Component, OnInit, ViewChild} from '@angular/core';
import {AuthService} from "../../_service/auth.service";
import {ApiConnectorService} from "../../_service/api-connector.service";
import {Router} from "@angular/router";

import {faEnvelope, faKey} from "@fortawesome/free-solid-svg-icons";
import {NgForm} from "@angular/forms";

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  faKey = faKey;
  faEnvelope = faEnvelope;

  @ViewChild('f') loginForm: NgForm | undefined;

  constructor(private router: Router, private authService: AuthService) {
  }

  async ngOnInit() {

  }

  public async onSubmit() {

    await this.authService.login(this.loginForm?.form.controls['email'].value, this.loginForm?.form.controls['password'].value).then(r => {
      localStorage.setItem('blank-token', r.data?.payload?.jwtToken);

      window.location.href = ApiConnectorService.apiUrl + r.data['payload']['destination'];
    });
  }

}
