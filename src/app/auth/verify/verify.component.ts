import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ApiMethodsService } from 'src/app/_service/_api/api-methods.service';

@Component({
  selector: 'app-verify',
  templateUrl: './verify.component.html',
  styleUrls: ['./verify.component.scss']
})
export class VerifyComponent implements OnInit {
  constructor(private api: ApiMethodsService, private route: ActivatedRoute) {}

  ngOnInit(): void {
    const token: string | null = this.route.snapshot.queryParamMap.get('token');
    if (token == null) {
      return;
    }

    this.api.post('auth/verify-email?token=' + token, null, true);
  }
}
