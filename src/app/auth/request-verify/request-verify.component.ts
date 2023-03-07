import { Component, OnInit } from '@angular/core';
import { AxiosResponse } from 'axios';
import { ApiMethodsService } from 'src/app/_service/_api/api-methods.service';
import {Title} from "@angular/platform-browser";

@Component({
  selector: 'app-request-verify',
  templateUrl: './request-verify.component.html',
  styleUrls: ['./request-verify.component.scss']
})
export class RequestVerifyComponent implements OnInit {
  constructor(private api: ApiMethodsService, private title: Title) {}

  ngOnInit(): void {
    this.api
      .get('auth/send-verify-email', true)
      .then((res: AxiosResponse) => {});

    this.title.setTitle("F1 Webshop | Request Verification")
  }
}
