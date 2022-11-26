import {Component, OnInit, ViewChild} from '@angular/core';
import {AuthService} from "../../_service/auth.service";
import {ApiConnectorService} from "../../_service/api-connector.service";
import {Router} from "@angular/router";

import {faEnvelope, faKey} from "@fortawesome/free-solid-svg-icons";
import {NgForm} from "@angular/forms";
import {publish} from "rxjs";

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  faKey = faKey;
  faEnvelope = faEnvelope;

  @ViewChild('f') loginForm: NgForm | undefined;
  isLoading = true;
  submitForm = false;

  constructor(private router: Router, private authService: AuthService) { }

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
        this.isLoading = false;
      }
    }

    this.isLoading = false;
  }

  public async onSubmit() {
    this.isLoading = true;
    this.submitForm = true;

    await this.authService.login(this.loginForm?.form.controls['email'].value, this.loginForm?.form.controls['password'].value).then(r => {
      console.log(r.data?.payload?.jwtToken)
      localStorage.setItem('blank-token', r.data?.payload?.jwtToken);

      window.location.href =
        ApiConnectorService.apiUrl + r.data['payload']['destination'];
    });

    // console.log(response.data['payload']['jwt-token'])

    // localStorage.setItem('blank-token', response.data['payload']['jwt-token']);
    // window.location.href =
    //   ApiConnectorService.apiUrl + response.data['payload']['destination'];

    await this.router.navigate([''])
    this.isLoading = false;
  }

}
