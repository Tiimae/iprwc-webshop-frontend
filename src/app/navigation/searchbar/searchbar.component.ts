import {Component, OnInit} from '@angular/core';
import {FormControl, FormGroup} from '@angular/forms';
import {Router} from '@angular/router';
import {faSearch, faShoppingCart, faUser} from '@fortawesome/free-solid-svg-icons';
import {ProductModel} from 'src/app/_models/product.model';
import {UserModel} from 'src/app/_models/user.model';
import {CartDataService} from 'src/app/_service/_data/cartData.service';
import {environment} from '../../../environments/environment';
import {ApiConnectorService} from '../../_service/_api/api-connector.service';
import {UserDataService} from '../../_service/_data/userData.service';
import {BehaviorSubject, Subject} from 'rxjs';

@Component({
  selector: 'app-searchbar',
  templateUrl: './searchbar.component.html',
  styleUrls: ['./searchbar.component.scss']
})
export class SearchbarComponent implements OnInit {

  public static loggedIn: Subject<boolean> = new BehaviorSubject<boolean>(false);

  public loggedInTemplate!: boolean;
  public apiUrl = environment.url;
  public faSearch = faSearch;
  public faShoppingCart = faShoppingCart;
  public faUser = faUser;
  public products!: ProductModel[];
  public username: string = '';
  public cartLength: number = 0;
  public searchGroup = new FormGroup({
    search: new FormControl('')
  });

  constructor(
    private router: Router,
    private cartDataService: CartDataService,
    private api: ApiConnectorService,
    private userDataService: UserDataService
  ) {
  }

  async ngOnInit(): Promise<void> {
    this.cartDataService.products$.subscribe((res) => {
      this.cartLength = res.length;
    });

    await this.ifItemIsInLocalStorage();
    this.getLoggedIn()
  }

  public async ifItemIsInLocalStorage(): Promise<void> {
    SearchbarComponent.loggedIn.next(await this.api.authenticated())
  }

  public getLoggedIn(): void {
    SearchbarComponent.loggedIn.subscribe((res: boolean) => {
      this.loggedInTemplate = res

      if (res) {
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
    });
  }

  public search(): void {
    this.router.navigate(['search'], {
      queryParams: {
        search: this.searchGroup.controls.search.value
      }
    });
  }

  private setUserName(user: UserModel): void {
    if (user.middleName == '') {
      this.username = user.firstName + ' ' + user.lastName;
    } else {
      this.username =
        user.firstName + ' ' + user.middleName + ' ' + user.lastName;
    }
  }
}
