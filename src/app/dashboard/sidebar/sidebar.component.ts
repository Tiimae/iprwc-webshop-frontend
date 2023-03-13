import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import {
  faAddressCard,
  faBox,
  faFileInvoice,
  faFire,
  faIndustry,
  faListAlt,
  faShippingFast,
  faSignOut,
  faUser
} from '@fortawesome/free-solid-svg-icons';
import { UserDataService } from 'src/app/_service/_data/userData.service';
import { AppComponent } from '../../app.component';
import { LoggedUserModel } from '../../_models/loggedUser.model';
import { AuthService } from '../../_service/auth.service';
import { ApiConnectorService } from '../../_service/_api/api-connector.service';
import { ApiMethodsService } from '../../_service/_api/api-methods.service';

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.scss']
})
export class SidebarComponent implements OnInit {
  public faUser = faUser;
  public faAddressCard = faAddressCard;
  public faShippingFast = faShippingFast;
  public faFileInvoice = faFileInvoice;
  public faSignOut = faSignOut;
  public faBox = faBox;
  public faListAlt = faListAlt;
  public faIndustry = faIndustry;
  public faFire = faFire;
  public hasRole: boolean = false;

  constructor(
    private router: Router,
    private api: ApiConnectorService,
    private methods: ApiMethodsService,
    private auth: AuthService
  ) {}

  async ngOnInit(): Promise<void> {
    if (AppComponent.hasRole == null) {
      this.api
        .getJwtPayload()
        .then(async (res: LoggedUserModel): Promise<void> => {
          this.methods.get(`user/${res.userId}/has-role`, true).then((res) => {
            AppComponent.hasRole = res.data.payload;
            this.hasRole = res.data.payload;
          });
        });
    } else {
      this.hasRole = AppComponent.hasRole;
    }
  }

  public logOut(): void {
    this.auth.logout();
    this.router.navigate(['/']);
  }
}
