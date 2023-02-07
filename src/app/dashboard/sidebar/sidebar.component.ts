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
import { SearchbarComponent } from '../../navigation/searchbar/searchbar.component';
import { LoggedUserModel } from '../../_models/loggedUser.model';
import { ApiConnectorService } from '../../_service/_api/api-connector.service';

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.scss']
})
export class SidebarComponent implements OnInit {
  faUser = faUser;
  faAddressCard = faAddressCard;
  faShippingFast = faShippingFast;
  faFileInvoice = faFileInvoice;
  faSignOut = faSignOut;
  faBox = faBox;
  faListAlt = faListAlt;
  faIndustry = faIndustry;
  faFire = faFire;
  hasRole: boolean = false;

  private jwtPayload: LoggedUserModel | undefined = undefined;

  constructor(
    private router: Router,
    private route: ActivatedRoute,
    private api: ApiConnectorService
  ) {}

  async ngOnInit(): Promise<void> {
    // @ts-ignore
    this.hasRole = await this.api
      .getJwtPayload()
      .then((r: LoggedUserModel): boolean => {
        return r.roles.includes('Admin') || r.roles.includes('Owner');
      });
  }

  public LogOut() {
    localStorage.removeItem('jwt-token');
    SearchbarComponent.loggedIn = false;

    this.router.navigate(['']);
  }
}
