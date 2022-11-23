import { Component, OnInit } from '@angular/core';
import {ApiConnectorService} from "../../_service/api-connector.service";
import {faUser, faAddressCard, faShippingFast, faFileInvoice, faSignOut, faBox, faListAlt, faIndustry, faFire} from "@fortawesome/free-solid-svg-icons";
import {Router} from "@angular/router";

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

  constructor(private router: Router) { }

  ngOnInit(): void {
  }

  public hasRole(): boolean {
    // @ts-ignore
    return ApiConnectorService.getInstance().user.roles.includes("Admin") || ApiConnectorService.getInstance().user.roles.includes("Owner");
  }

  public LogOut() {
    localStorage.removeItem("jwt-token");
    localStorage.removeItem("user-id");

    this.router.navigate([''])
  }

}
