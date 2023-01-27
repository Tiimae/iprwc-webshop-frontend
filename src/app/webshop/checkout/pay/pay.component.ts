import { Component, OnInit } from '@angular/core';
import {UserDataService} from "../../../_service/data/userData.service";
import {ApiConnectorService} from "../../../_service/api-connector.service";
import {UserModel} from "../../../_models/user.model";
import {UserAddressesModel} from "../../../_models/userAddresses.model";
import {AddressEnum} from "../../../_enum/address.enum";
import {UserAddressComponent} from "./user-address/user-address.component";
import { CartDataService } from 'src/app/_service/data/cartData.service';
import {of} from "rxjs";
import { OrderDataService } from 'src/app/_service/data/orderData.service';
import {Router} from "@angular/router";

@Component({
  selector: 'app-pay',
  templateUrl: './pay.component.html',
  styleUrls: ['./pay.component.scss']
})
export class PayComponent implements OnInit {

  isLoading: boolean = false;
  user!: UserModel;
  deliveryAddresses: UserAddressesModel[] = [];
  invoiceAddresses: UserAddressesModel[] = [];
  currentDeliveryAddress: UserAddressesModel | null = null;
  currentInvoiceAddress: UserAddressesModel | null = null;

  constructor(
    private userDataService: UserDataService,
    private api: ApiConnectorService,
    private cartDataService: CartDataService,
    private orderDataService: OrderDataService,
    private router: Router
  ) { }

  ngOnInit(): void {
    this.isLoading = true;

    this.api.getJwtPayload().then(payload => {

      setTimeout(() => {
        this.userDataService.getCurrentUser(payload.userId).subscribe(res => {
          if (res == undefined) {
            return;
          }

          this.user = res;

          this.user.addresses.forEach(address => {
            if (address.type === AddressEnum.DELIVERY.toString()) {
              this.deliveryAddresses.push(address);
            } else if (address.type === AddressEnum.INVOICE.toString()) {
              this.invoiceAddresses.push(address)
            }
          })
        })
      }, 200)
    });

    this.isLoading = false;
  }

  changeSeclectedDeliveryAddress(address: UserAddressesModel) {
    if (this.currentDeliveryAddress == null) {
      const streetName = address.street.replace(" ", "") + address.houseNumber + 'delivery'
      const elementToAdd = document.getElementById(streetName)
      if (elementToAdd == null) {
        return;
      }
      elementToAdd.style.border = "1px solid blue";
      elementToAdd.style.borderRadius = "5px"
    } else {
      const streetNameDelete = this.currentDeliveryAddress.street.replace(" ", "") + this.currentDeliveryAddress.houseNumber + 'delivery'
      const elementToDelete = document.getElementById(streetNameDelete)
      if (elementToDelete == null) {
        return;
      }
      elementToDelete.style.border = "0px solid blue";

      const streetName = address.street.replace(" ", "") + address.houseNumber + 'delivery'
      const elementToAdd = document.getElementById(streetName)
      if (elementToAdd == null) {
        return;
      }
      elementToAdd.style.border = "1px solid blue";
      elementToAdd.style.borderRadius = "5px"
    }

    this.currentDeliveryAddress = address;
  }

  changeSeclectedInvoiceAddress(address: UserAddressesModel) {
    if (this.currentInvoiceAddress == null) {
      const streetName = address.street.replace(" ", "") + address.houseNumber + 'invoice'
      const elementToAdd = document.getElementById(streetName)
      if (elementToAdd == null) {
        return;
      }
      elementToAdd.style.border = "1px solid blue";
      elementToAdd.style.borderRadius = "5px"
    } else {
      const streetNameDelete = this.currentInvoiceAddress.street.replace(" ", "") + this.currentInvoiceAddress.houseNumber + 'invoice'
      const elementToDelete = document.getElementById(streetNameDelete)
      if (elementToDelete == null) {
        return;
      }
      elementToDelete.style.border = "0px solid blue";

      const streetName = address.street.replace(" ", "") + address.houseNumber + 'invoice'
      const elementToAdd = document.getElementById(streetName)
      if (elementToAdd == null) {
        return;
      }
      elementToAdd.style.border = "1px solid blue";
      elementToAdd.style.borderRadius = "5px"
    }

    this.currentInvoiceAddress = address;
  }

  createOrder(): void {

    if (this.currentDeliveryAddress == null) {
      return
    }

    if (this.currentInvoiceAddress == null) {
      return
    }
    const productIds: JSON[] = []

    this.cartDataService.products$.subscribe(res => {
      res.forEach(product => {
        productIds.push(JSON.parse(this.cartDataService.getCartItem(product.id)));
      })
    })

    const fd = new FormData();
    fd.append("invoice", this.currentInvoiceAddress.id)
    fd.append("delivery", this.currentDeliveryAddress.id)
    fd.append("userId", this.user.id)
    fd.append("products", JSON.stringify(productIds))

    this.orderDataService.create(fd).then(res => {
      this.user.orders.push(res);
      this.cartDataService.clearCart();
      this.router.navigate([''])
    })
  }

}
