import { Component, OnInit } from '@angular/core';
import { faSearch, faShoppingCart, faUser } from "@fortawesome/free-solid-svg-icons";
import {ApiConnectorService} from "../../service/api-connector.service";

@Component({
  selector: 'app-searchbar',
  templateUrl: './searchbar.component.html',
  styleUrls: ['./searchbar.component.scss']
})
export class SearchbarComponent implements OnInit {

  faSearch = faSearch;
  faShoppingCart = faShoppingCart;
  faUser = faUser;

  username: string = ''

  constructor() { }

  ngOnInit(): void {
    var userIdFromStore = ApiConnectorService.getInstance().getUserIdFromStore();

    if(userIdFromStore != null) {
      ApiConnectorService.getInstance().auth().get("user/" + userIdFromStore).then(r => {
        if (r.data.payload.firstName == '') {
          this.username = r.data.payload.firstName + ' ' + r.data.payload.lastName
        } else {
          this.username = r.data.payload.firstName + ' ' + r.data.payload.middleName + ' ' + r.data.payload.lastName
        }
      });
    }
  }

  public ifItemIsInLocalStorage(): boolean {
    return ApiConnectorService.getInstance().authenticated();
  }

}
