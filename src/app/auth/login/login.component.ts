import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ApiConnectorService } from '../../_service/api-connector.service';
import { AuthService } from '../../_service/auth.service';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { faEnvelope, faKey } from '@fortawesome/free-solid-svg-icons';
import { ToastrService } from 'ngx-toastr';
import { AppComponent } from '../../app.component';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
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
  });

  constructor(
    private router: Router,
    private authService: AuthService,
    private toastr: ToastrService,
    private api: ApiConnectorService
  ) {}

  async ngOnInit() {
    if (localStorage.getItem('jwt-token')) {
      try {
        const tokenPayload = await this.api.getJwtPayload();

        setTimeout(async () => {
          if (tokenPayload !== undefined) {
            await this.router.navigate(['/']);
          }
        }, 300);
      } catch (err) {}
    }
    AppComponent.isLoading = false;
  }

  public async onSubmit() {

    const email = this.loginForm.controls.email.value;
    const password = this.loginForm.controls.password.value;

    if (email == null || password == null) {
      this.toastr.error('Something went wrong!', 'Failed');
      return;
    }

    if (!this.loginForm.value) {
      this.toastr.error('Something went wrong!', 'Failed');
      return;
    }

    await this.authService.login(email, password).then((r) => {
      if (r.data.code == 200) {
        localStorage.setItem('refresh-token', r.data.payload?.refreshToken);
        localStorage.setItem('blank-token', r.data.payload?.jwtToken);
        window.location.href =
          ApiConnectorService.apiUrl + r.data['payload']['destination'];
        this.toastr.success('You are Logged in successfully!', r.data.message);
      } else {
        this.toastr.error('Credentials doesnt match!', r.data.message);
      }
    });

    AppComponent.isLoading = false;
  }
}
