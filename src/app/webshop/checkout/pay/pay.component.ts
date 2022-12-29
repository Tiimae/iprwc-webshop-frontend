import { Component, OnInit } from '@angular/core';
import {UserDataService} from "../../../_service/data/userData.service";
import {ApiConnectorService} from "../../../_service/api-connector.service";
import {UserModel} from "../../../_models/user.model";
import {UserAddressesModel} from "../../../_models/userAddresses.model";
import {AddressEnum} from "../../../_enum/address.enum";
import {UserAddressComponent} from "./user-address/user-address.component";

@Component({
  selector: 'app-pay',
  templateUrl: './pay.component.html',
  styleUrls: ['./pay.component.scss']
})
export class PayComponent implements OnInit {

  user!: UserModel;
  deliveryAddresses: UserAddressesModel[] = [];
  currentAddress: UserAddressesModel | null = null;

  constructor(
    private userDataService: UserDataService,
    private api: ApiConnectorService
  ) { }

  ngOnInit(): void {
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
            }
          })
        })
      }, 200)
    });
  }

  changeSeclectedAddress(address: UserAddressesModel) {
    if (this.currentAddress == null) {
      const streetName = address.street.replace(" ", "") + address.houseNumber
      const elementToAdd = document.getElementById(streetName)
      if (elementToAdd == null) {
        return;
      }
      elementToAdd.style.border = "1px solid blue";
    } else {
      const streetNameDelete = this.currentAddress.street.replace(" ", "") + this.currentAddress.houseNumber
      const elementToDelete = document.getElementById(streetNameDelete)
      if (elementToDelete == null) {
        return;
      }
      elementToDelete.style.border = "0px solid blue";

      const streetName = address.street.replace(" ", "") + address.houseNumber
      const elementToAdd = document.getElementById(streetName)
      if (elementToAdd == null) {
        return;
      }
      elementToAdd.style.border = "1px solid blue";
    }

    this.currentAddress = address;
  }

}
