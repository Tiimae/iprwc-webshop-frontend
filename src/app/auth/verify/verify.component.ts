import { Component, OnInit } from '@angular/core';
import { Title } from '@angular/platform-browser';
import { ActivatedRoute } from '@angular/router';
import { ApiConnectorService } from 'src/app/_service/_api/api-connector.service';
import { ApiMethodsService } from 'src/app/_service/_api/api-methods.service';

@Component({
  selector: 'app-verify',
  templateUrl: './verify.component.html',
  styleUrls: ['./verify.component.scss']
})
export class VerifyComponent implements OnInit {
  constructor(
    private api: ApiMethodsService,
    private route: ActivatedRoute,
    private apiConnector: ApiConnectorService,
    private title: Title
  ) {}

  ngOnInit(): void {
    const token: string | null = this.route.snapshot.queryParamMap.get('token');
    if (token == null) {
      return;
    }

    this.api.post('auth/verify-email?token=' + token, null, true);
    this.title.setTitle("F1 Webshop | Verify")
  }
}
