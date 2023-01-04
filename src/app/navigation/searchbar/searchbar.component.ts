import {Component, OnInit} from '@angular/core';
import {faSearch, faShoppingCart, faUser} from "@fortawesome/free-solid-svg-icons";
import {ApiConnectorService} from "../../_service/api-connector.service";
import {LoggedUserModel} from "../../_models/loggedUser.model";
import {AuthService} from "../../_service/auth.service";
import {Router} from "@angular/router";
import {ProductModel} from 'src/app/_models/product.model';
import {CartDataService} from 'src/app/_service/data/cartData.service';
import {environment} from "../../../environments/environment";
import {UserDataService} from "../../_service/data/userData.service";
import {UserModel} from "../../_models/user.model";

@Component({
  selector: 'app-searchbar',
  templateUrl: './searchbar.component.html',
  styleUrls: ['./searchbar.component.scss']
})
export class SearchbarComponent implements OnInit {
  public apiUrl = environment.url;
  faSearch = faSearch;
  faShoppingCart = faShoppingCart;
  faUser = faUser;
  products!: ProductModel[];
  loggedIn: boolean = false;

  username: string = ''

  cartLength: number = 0;

  constructor(
    private router: Router,
    private authService: AuthService,
    private cartDataService: CartDataService,
    private api: ApiConnectorService,
    private userDataService: UserDataService
  ) {
  }

  async ngOnInit(): Promise<void> {
    this.api.getJwtPayload().then(async jwt => {
      if (jwt?.userId != undefined) {
        this.userDataService.users$.subscribe(res => {
          const user: UserModel | undefined = res.find(currentUser => currentUser.id === jwt.userId)
          if (user == undefined) {
            return;
          }

          if (user.middleName == '') {
            this.username = user.firstName + ' ' + user.lastName
          } else {
            this.username = user.firstName + ' ' + user.middleName + ' ' + user.lastName
          }
        })
      }
    });

    this.cartDataService
      .products$
      .subscribe(res => {
        this.cartLength = res.length;

      })

    this.ifItemIsInLocalStorage();
  }

  public async ifItemIsInLocalStorage(): Promise<void> {
    this.loggedIn = await this.api.authenticated();
  }

}
