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
import {Router} from "@angular/router";
import {LoggedUserModel} from "../../_models/loggedUser.model";

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

  private jwtPayload: LoggedUserModel | undefined = undefined

  constructor(private router: Router) {
  }

  ngOnInit(): void {
    // ApiConnectorService.getInstance().getJwtPayload().then(r => {
    //   this.jwtPayload = r;
    // })
  }

  public hasRole(): boolean {

    // @ts-ignore
    return ApiConnectorService.getInstance().user?.roles.includes("Admin") || ApiConnectorService.getInstance().user?.roles.includes("Owner");

  }

  public LogOut() {
    localStorage.removeItem("jwt-token");

    this.router.navigate([''])
  }

}
