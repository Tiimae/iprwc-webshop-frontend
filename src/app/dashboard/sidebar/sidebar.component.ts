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
    private route: ActivatedRoute,
    private api: ApiConnectorService
  ) {}

  async ngOnInit(): Promise<void> {
    this.hasRole = await (this.api
      .getJwtPayload())
      .then((r: LoggedUserModel): boolean => {
        console.log(r.roles.includes('Admin') || r.roles.includes('Owner'))
        return r.roles.includes('Admin') || r.roles.includes('Owner');
      });
  }

  public LogOut(): void {
    localStorage.removeItem('jwt-token');
    SearchbarComponent.loggedIn = false;

    this.router.navigate(['']);
  }
}
