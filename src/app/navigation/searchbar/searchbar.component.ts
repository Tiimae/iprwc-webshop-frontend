import {Component, OnInit} from '@angular/core';
import {faSearch, faShoppingCart, faUser} from "@fortawesome/free-solid-svg-icons";
import {ApiConnectorService} from "../../_service/api-connector.service";
import {LoggedUserModel} from "../../_models/loggedUser.model";
import {AuthService} from "../../_service/auth.service";
import {Router} from "@angular/router";
import { ProductModel } from 'src/app/_models/product.model';
import { CartDataService } from 'src/app/_service/data/cartData.service';

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

  cartLength: number = 0;

  constructor(
    private router: Router,
    private authService: AuthService,
    private cartDataService: CartDataService
  ) {
  }

  async ngOnInit(): Promise<void> {
    const jwtToken = localStorage.getItem('blank-token');

    if (localStorage.getItem('blank-token') !== null) {
      try {
        const secret = await this.authService.getSecret();

        localStorage.clear();

        ApiConnectorService.getInstance().storeJwtToken(
          jwtToken ?? '',
          secret.data['message']
        );
      } catch (error) {
        localStorage.clear();
      }
    }

    if (localStorage.getItem('jwt-token')) {
      try {
        const tokenPayload = await ApiConnectorService.getInstance().user;
        if (tokenPayload !== undefined) {
          this.router.navigate(['/']);
        }
      } catch (err) {
        console.log(err);
      }
    }


    ApiConnectorService.getInstance().getJwtPayload().then(jwt => {
      // console.log(jwt)
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

    this.cartDataService
      .products$
      .subscribe(res => {
        this.cartLength = res.length;

      })
  }

  public ifItemIsInLocalStorage(): boolean {
    return ApiConnectorService.getInstance().authenticated();
  }

  setUsername(): void {

  }

}
