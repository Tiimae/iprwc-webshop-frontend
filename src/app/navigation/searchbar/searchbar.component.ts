import {Component, OnInit} from '@angular/core';
import {faSearch, faShoppingCart, faUser} from "@fortawesome/free-solid-svg-icons";
import {ApiConnectorService} from "../../_service/api-connector.service";
import {LoggedUserModel} from "../../_models/loggedUser.model";

@Component({
  selector: 'app-searchbar',
  templateUrl: './searchbar.component.html',
  styleUrls: ['./searchbar.component.scss']
})
export class SearchbarComponent implements OnInit {

  faSearch = faSearch;
  faShoppingCart = faShoppingCart;
  faUser = faUser;
  user: LoggedUserModel | undefined;

  username: string = ''

  constructor() {
  }

  ngOnInit(): void {
    ApiConnectorService.getInstance().getJwtPayload().then(jwt => {
      if (jwt?.userId != undefined) {
        ApiConnectorService.getInstance().auth().get("user/" + jwt?.userId).then(r => {
          if (r.data.payload.middleName == '') {
            this.username = r.data.payload.firstName + ' ' + r.data.payload.lastName
          } else {
            this.username = r.data.payload.firstName + ' ' + r.data.payload.middleName + ' ' + r.data.payload.lastName
          }
        })
      }
    });
  }

  public ifItemIsInLocalStorage(): boolean {
    return ApiConnectorService.getInstance().authenticated();
  }

  setUsername(): void {

  }

}
