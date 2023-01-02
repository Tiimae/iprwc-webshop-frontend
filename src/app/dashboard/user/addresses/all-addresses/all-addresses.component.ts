import { Component, OnInit } from '@angular/core';
import {AddressEnum} from "../../../../_enum/address.enum";
import {UserModel} from "../../../../_models/user.model";
import {UserAddressesModel} from "../../../../_models/userAddresses.model";
import {UserDataService} from "../../../../_service/data/userData.service";
import {ApiConnectorService} from "../../../../_service/api-connector.service";
import * as CryptoJs from "crypto-js";
import {Router} from "@angular/router";

@Component({
  selector: 'app-all-addresses',
  templateUrl: './all-addresses.component.html',
  styleUrls: ['./all-addresses.component.scss']
})
export class AllAddressesComponent implements OnInit {
  user!: UserModel;
  deliveryAddresses: UserAddressesModel[] = [];
  invoiceAddresses: UserAddressesModel[] = [];

  constructor(
    private userDataService: UserDataService,
    private api: ApiConnectorService,
    private router: Router
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
            } else if (address.type === AddressEnum.INVOICE.toString()) {
              this.invoiceAddresses.push(address)
            }
          })
        })
      }, 200)
    });
  }

  async changeURL(event: UserAddressesModel, type: string) {
    let encryptedId: string = CryptoJs.Rabbit.encrypt(event.id, await this.api.getDecryptKey()).toString()
    const id = encryptedId.replace(new RegExp("/", "g"), "*");
    await this.router.navigate(['dashboard', 'user', 'addresses', id], {
      queryParams: {
        type: type
      }
    });
  }

}
