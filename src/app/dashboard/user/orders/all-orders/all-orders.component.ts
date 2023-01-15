import { Component, OnInit } from '@angular/core';
import {UserDataService} from "../../../../_service/data/userData.service";
import {ApiConnectorService} from "../../../../_service/api-connector.service";
import {UserModel} from "../../../../_models/user.model";
import {OrderModel} from "../../../../_models/order.model";
import {AppComponent} from "../../../../app.component";

@Component({
  selector: 'app-all-orders',
  templateUrl: './all-orders.component.html',
  styleUrls: ['./all-orders.component.scss']
})
export class AllOrdersComponent implements OnInit {

  user!: UserModel;
  userOrders: OrderModel[] = [];

  constructor(
    private userDataService: UserDataService,
    private api: ApiConnectorService,
  ) { }

  ngOnInit(): void {
    AppComponent.isLoading = true;
    this.api.getJwtPayload().then(payload => {

      setTimeout(() => {
        this.userDataService.getCurrentUser(payload.userId).subscribe(res => {
          if (res == undefined) {
            return;
          }

          this.user = res;
          this.userOrders = this.user.orders
        })
      }, 200)
    });

    this.userOrders = this.userOrders.sort((a, b) => {
      let comparison = 0;
      if (a.orderDate > b.orderDate) {
        comparison = 1;
      } else if (a.orderDate < b.orderDate) {
        comparison = -1;
      }
      return comparison;
    });

    AppComponent.isLoading = false;
  }

  compare(a: OrderModel, b: OrderModel) {
    // Use toUpperCase() to ignore character casing
    const bandA = a.orderId;
    const bandB = b.orderId;

    let comparison = 0;
    if (bandA > bandB) {
      comparison = 1;
    } else if (bandA < bandB) {
      comparison = -1;
    }
    return comparison;
  }

}
