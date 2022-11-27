import {Component, OnInit, ViewChild} from '@angular/core';
import {faUser, faEnvelope} from "@fortawesome/free-solid-svg-icons";
import {NgForm} from "@angular/forms";
import {AuthService} from "../../_service/auth.service";
import {ApiConnectorService} from "../../_service/api-connector.service";
import {ApiMethodsService} from "../../_service/api-methods.service";

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

    const user = ApiConnectorService.getInstance().user;
    if (user?.userId != undefined) {
      ApiMethodsService.getInstance().get('user/' + user?.userId).then(apiResponse => {
        this.accountForm?.form.controls['firstname'].setValue(apiResponse.data.payload.firstName);
      })
    }
  }

}
