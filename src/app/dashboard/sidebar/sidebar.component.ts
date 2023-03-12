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
import { SearchbarComponent } from '../../navigation/searchbar/searchbar.component';
import { LoggedUserModel } from '../../_models/loggedUser.model';
import { ApiConnectorService } from '../../_service/_api/api-connector.service';
import {RoleModel} from "../../_models/role.model";

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
    private api: ApiConnectorService,
    private userDataService: UserDataService
  ) {}

  async ngOnInit(): Promise<void> {
    this.hasRole = await (this.api
      .getJwtPayload())
      .then(async (r: LoggedUserModel): Promise<boolean> => {
        return await this.userDataService.getUserWithRoleByRequest(r.userId).then((res): boolean => {
          let hasRole: boolean = false;
          res.data.payload.roles.forEach((role: RoleModel) => {
            if (role.name === "Admin" || role.name === "Owner") {
              hasRole = true;
            }
          })

          return hasRole;
        })
      });
  }

  public LogOut(): void {
    localStorage.removeItem('jwt-token');
    localStorage.removeItem('refresh-token');
    SearchbarComponent.loggedIn.next(false);

    this.router.navigate(['']);
  }
}
