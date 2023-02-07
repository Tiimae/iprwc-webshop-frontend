import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import {
  faSearch,
  faShoppingCart,
  faUser
} from '@fortawesome/free-solid-svg-icons';
import { ProductModel } from 'src/app/_models/product.model';
import { UserModel } from 'src/app/_models/user.model';
import { CartDataService } from 'src/app/_service/_data/cartData.service';
import { environment } from '../../../environments/environment';
import { ApiConnectorService } from '../../_service/_api/api-connector.service';
import { UserDataService } from '../../_service/_data/userData.service';

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
  static loggedIn: boolean;

  username: string = '';

  cartLength: number = 0;

  searchGroup = new FormGroup({
    search: new FormControl('')
  });

  constructor(
    private router: Router,
    private cartDataService: CartDataService,
    private api: ApiConnectorService,
    private userDataService: UserDataService
  ) {}

  async ngOnInit(): Promise<void> {
    this.cartDataService.products$.subscribe((res) => {
      this.cartLength = res.length;
    });

    await this.ifItemIsInLocalStorage();

    if (this.getLoggedIn()) {
      this.api.getJwtPayload().then(async (jwt) => {
        if (jwt?.userId != undefined) {
          this.userDataService.getCurrentUser(jwt.userId).subscribe((res) => {
            if (res == undefined) {
              this.userDataService.getUserByRequest(jwt.userId).then((res) => {
                this.setUserName(res.data.payload);
              });
            } else {
              this.setUserName(res);
            }
          });
        }
      });
    }
  }

  public async ifItemIsInLocalStorage(): Promise<void> {
    SearchbarComponent.loggedIn = await this.api.authenticated();
  }

  getLoggedIn(): boolean {
    return SearchbarComponent.loggedIn;
  }

  search(): void {
    this.router.navigate(['search'], {
      queryParams: {
        search: this.searchGroup.controls.search.value
      }
    });
  }

  private setUserName(user: UserModel) {
    if (user.middleName == '') {
      this.username = user.firstName + ' ' + user.lastName;
    } else {
      this.username =
        user.firstName + ' ' + user.middleName + ' ' + user.lastName;
    }
  }
}
