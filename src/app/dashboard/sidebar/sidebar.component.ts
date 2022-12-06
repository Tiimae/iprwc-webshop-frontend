import {Component, OnInit} from '@angular/core';
import {ApiConnectorService} from "../../_service/api-connector.service";
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
} from "@fortawesome/free-solid-svg-icons";
import {ActivatedRoute, Router} from "@angular/router";
import {LoggedUserModel} from "../../_models/loggedUser.model";
import {HasRoleGuard} from "../../_guard/has-role.guard";

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.scss']
})
export class SidebarComponent implements OnInit {

  faUser = faUser;
  faAddressCard = faAddressCard
  faShippingFast = faShippingFast
  faFileInvoice = faFileInvoice
  faSignOut = faSignOut
  faBox = faBox
  faListAlt = faListAlt
  faIndustry = faIndustry
  faFire = faFire
  hasRole: boolean = false;

  private jwtPayload: LoggedUserModel | undefined = undefined

  constructor(private router: Router, private route: ActivatedRoute) {
  }

  async ngOnInit(): Promise<void> {
    // @ts-ignore
    this.hasRole = await ApiConnectorService.getInstance().getJwtPayload().then((r: LoggedUserModel): boolean => {
      return r.roles.includes("Admin") || r.roles.includes("Owner");
    })
  }

  // public async hasRole(): Promise<boolean> {
  //   // @ts-ignore
  //   return await ;
  // }

  public LogOut() {
    localStorage.removeItem("jwt-token");

    this.router.navigate([''])
  }

}
