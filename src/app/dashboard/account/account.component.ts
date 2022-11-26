import {Component, OnInit, ViewChild} from '@angular/core';
import {faUser, faEnvelope} from "@fortawesome/free-solid-svg-icons";
import {NgForm} from "@angular/forms";
import {AuthService} from "../../_service/auth.service";
import {ApiConnectorService} from "../../_service/api-connector.service";

@Component({
  selector: 'app-account',
  templateUrl: './account.component.html',
  styleUrls: ['./account.component.scss']
})
export class AccountComponent implements OnInit {

  faUser = faUser;
  faEnvelope = faEnvelope;
  @ViewChild('f') accountForm: NgForm | undefined;

  constructor() {
  }

  ngOnInit(): void {

    ApiConnectorService.getInstance().getJwtPayload().then(r => {
      if (r?.userId != undefined) {
        ApiConnectorService.getInstance().auth().get('user/' + r?.userId).then(apiResponse => {
          this.accountForm?.form.controls['firstname'].setValue(apiResponse.data.payload.firstName);
        })
      }
    })
  }

}
