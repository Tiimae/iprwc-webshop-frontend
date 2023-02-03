import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { UserModel } from 'src/app/_models/user.model';
import { CartDataService } from 'src/app/_service/data/cartData.service';
import { OrderDataService } from 'src/app/_service/data/orderData.service';
import { UserAddressesDataService } from 'src/app/_service/data/userAddressesData.service';
import { UserDataService } from 'src/app/_service/data/userData.service';
import { AddressEnum } from '../../../_enum/address.enum';
import { UserAddressesModel } from '../../../_models/userAddresses.model';
import { ApiConnectorService } from '../../../_service/api-connector.service';

@Component({
  selector: 'app-pay',
  templateUrl: './pay.component.html',
  styleUrls: ['./pay.component.scss']
})
export class PayComponent implements OnInit {
  isLoading: boolean = false;
  userAddresses: UserAddressesModel[] = [];
  userId!: string;
  deliveryAddresses: UserAddressesModel[] = [];
  invoiceAddresses: UserAddressesModel[] = [];
  currentDeliveryAddress: UserAddressesModel | null = null;
  currentInvoiceAddress: UserAddressesModel | null = null;

  private check: boolean = false;

  constructor(
    private userAddressDataService: UserAddressesDataService,
    private api: ApiConnectorService,
    private cartDataService: CartDataService,
    private orderDataService: OrderDataService,
    private router: Router,
    private userDataService: UserDataService
  ) {}

  ngOnInit(): void {
    this.isLoading = true;

    this.api.getJwtPayload().then((payload) => {
      this.userId = payload.userId;

      this.userAddressDataService.userAddresses$.subscribe((res) => {
        if (res.length == 0 && this.check == false) {
          this.userAddressDataService.getByUserId(payload.userId);
          this.check = true;
        }

        this.userAddresses = res;
        this.setAddresses();
      });
    });

    this.isLoading = false;
  }

  private setAddresses(): void {
    this.userAddresses.forEach((address) => {
      if (address.type === AddressEnum.DELIVERY.toString()) {
        this.deliveryAddresses.push(address);
      } else if (address.type === AddressEnum.INVOICE.toString()) {
        this.invoiceAddresses.push(address);
      }
    });
  }

  changeSeclectedDeliveryAddress(address: UserAddressesModel) {
    if (this.currentDeliveryAddress == null) {
      const streetName =
        address.street.replace(' ', '') + address.houseNumber + 'delivery';
      const elementToAdd = document.getElementById(streetName);
      if (elementToAdd == null) {
        return;
      }
      elementToAdd.style.border = '1px solid blue';
      elementToAdd.style.borderRadius = '5px';
    } else {
      const streetNameDelete =
        this.currentDeliveryAddress.street.replace(' ', '') +
        this.currentDeliveryAddress.houseNumber +
        'delivery';
      const elementToDelete = document.getElementById(streetNameDelete);
      if (elementToDelete == null) {
        return;
      }
      elementToDelete.style.border = '0px solid blue';

      const streetName =
        address.street.replace(' ', '') + address.houseNumber + 'delivery';
      const elementToAdd = document.getElementById(streetName);
      if (elementToAdd == null) {
        return;
      }
      elementToAdd.style.border = '1px solid blue';
      elementToAdd.style.borderRadius = '5px';
    }

    this.currentDeliveryAddress = address;
  }

  changeSeclectedInvoiceAddress(address: UserAddressesModel) {
    if (this.currentInvoiceAddress == null) {
      const streetName =
        address.street.replace(' ', '') + address.houseNumber + 'invoice';
      const elementToAdd = document.getElementById(streetName);
      if (elementToAdd == null) {
        return;
      }
      elementToAdd.style.border = '1px solid blue';
      elementToAdd.style.borderRadius = '5px';
    } else {
      const streetNameDelete =
        this.currentInvoiceAddress.street.replace(' ', '') +
        this.currentInvoiceAddress.houseNumber +
        'invoice';
      const elementToDelete = document.getElementById(streetNameDelete);
      if (elementToDelete == null) {
        return;
      }
      elementToDelete.style.border = '0px solid blue';

      const streetName =
        address.street.replace(' ', '') + address.houseNumber + 'invoice';
      const elementToAdd = document.getElementById(streetName);
      if (elementToAdd == null) {
        return;
      }
      elementToAdd.style.border = '1px solid blue';
      elementToAdd.style.borderRadius = '5px';
    }

    this.currentInvoiceAddress = address;
  }

  createOrder(): void {
    if (this.currentDeliveryAddress == null) {
      return;
    }

    if (this.currentInvoiceAddress == null) {
      return;
    }
    const productIds: JSON[] = [];

    this.cartDataService.products$.subscribe((res) => {
      res.forEach((product) => {
        productIds.push(
          JSON.parse(this.cartDataService.getCartItem(product.id))
        );
      });
    });

    const fd = new FormData();
    fd.append('invoice', this.currentInvoiceAddress.id);
    fd.append('delivery', this.currentDeliveryAddress.id);
    fd.append('userId', this.userId);
    fd.append('products', JSON.stringify(productIds));

    this.orderDataService.create(fd).then((res) => {
      this.userDataService.getUserByRequest(this.userId).then((oldUser) => {
        const user: UserModel = oldUser.data.payload;
        user.orders.push(res);
        this.userDataService.updateUser(user, false);
      });
      this.cartDataService.clearCart();
      this.router.navigate(['']);
    });
  }
}
