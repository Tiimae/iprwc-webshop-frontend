import { Component, OnInit } from '@angular/core';
import { OrderDataService } from 'src/app/_service/data/orderData.service';
import { AppComponent } from '../../../../app.component';
import { OrderModel } from '../../../../_models/order.model';
import { UserModel } from '../../../../_models/user.model';
import { ApiConnectorService } from '../../../../_service/api-connector.service';

@Component({
  selector: 'app-all-orders',
  templateUrl: './all-orders.component.html',
  styleUrls: ['./all-orders.component.scss']
})
export class AllOrdersComponent implements OnInit {
  user!: UserModel;
  userOrders: OrderModel[] = [];

  constructor(
    private orderDataService: OrderDataService,
    private api: ApiConnectorService
  ) {}

  ngOnInit(): void {
    AppComponent.isLoading = true;
    this.api.getJwtPayload().then((payload) => {
      this.orderDataService.getByUserId(payload.userId).then((res) => {
        this.userOrders = res.data.payload.sort(
          (a: { orderId: number }, b: { orderId: number }) => {
            let comparison = 0;
            if (a.orderId > b.orderId) {
              comparison = -1;
            } else if (a.orderId < b.orderId) {
              comparison = 1;
            }
            return comparison;
          }
        );
      });
    });

    AppComponent.isLoading = false;
  }
}
