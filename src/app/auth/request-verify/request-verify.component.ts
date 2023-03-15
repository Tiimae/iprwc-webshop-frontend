import {Component, OnInit} from '@angular/core';
import {AxiosResponse} from 'axios';
import {ApiMethodsService} from 'src/app/_service/_api/api-methods.service';
import {Title} from "@angular/platform-browser";
import {Router} from "@angular/router";
import {FormControl, FormGroup, Validators} from "@angular/forms";
import {ToastrService} from "ngx-toastr";
import {AuthService} from "../../_service/auth.service";

@Component({
  selector: 'app-request-verify',
  templateUrl: './request-verify.component.html',
  styleUrls: ['./request-verify.component.scss']
})
export class RequestVerifyComponent implements OnInit {

  public verifyForm: FormGroup = new FormGroup({
    token: new FormControl('', [Validators.required])
  });

  constructor(private api: ApiMethodsService, private title: Title, private router: Router, private toastr: ToastrService, private auth: AuthService) {}

  ngOnInit(): void {
    this.api
      .get('auth/send-verify-email', true)
      .then((res: AxiosResponse) => {});

    this.title.setTitle("F1 Webshop | Request Verification")
  }

  public onSubmit(): void {
    const token: string = this.verifyForm.controls['token'].value;

    if (token == null) {
      this.toastr.error("Token can't be null", "ERROR")
      this.verifyForm.reset();
    }

    this.api.post('auth/verify-email?token=' + token, null, true).then(res => {
      if (res.data.code === 200) {
        this.toastr.success("Email has been verified", "Success");
        this.router.navigate(["/"]);
      } else {
        this.toastr.error(res.data.message, "ERROR")
      }
    });
  }

  public logout(): void {
    this.auth.logout();
    this.router.navigate(["/"])
  }
}
