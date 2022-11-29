import {Component, OnInit, ViewChild} from '@angular/core';
import {faEnvelope, faUser} from "@fortawesome/free-solid-svg-icons";
import {NgForm} from "@angular/forms";
import {ApiConnectorService} from "../../../_service/api-connector.service";
import {ApiMethodsService} from "../../../_service/api-methods.service";

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
      ApiMethodsService.getInstance().get('user/' + user?.userId + "/roles", true).then(apiResponse => {
        this.accountForm?.form.controls['firstname'].setValue(apiResponse.data.payload.firstName);
        this.accountForm?.form.controls['middlename'].setValue(apiResponse.data.payload.middleName);
        this.accountForm?.form.controls['lastname'].setValue(apiResponse.data.payload.lastName);
        this.accountForm?.form.controls['email'].setValue(apiResponse.data.payload.email);
      })
    }
  }

  public onSubmit() : void {

  }

}
