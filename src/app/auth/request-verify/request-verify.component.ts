import { Component, OnInit } from '@angular/core';
import { AxiosResponse } from 'axios';
import { ApiMethodsService } from 'src/app/_service/_api/api-methods.service';

@Component({
  selector: 'app-request-verify',
  templateUrl: './request-verify.component.html',
  styleUrls: ['./request-verify.component.scss']
})
export class RequestVerifyComponent implements OnInit {
  constructor(private api: ApiMethodsService) {}

  ngOnInit(): void {
    this.api
      .get('auth/send-verify-email', true)
      .then((res: AxiosResponse) => {});
  }
}
