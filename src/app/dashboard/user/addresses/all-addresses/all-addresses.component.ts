import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import * as CryptoJs from 'crypto-js';
import { UserAddressesDataService } from 'src/app/_service/_data/userAddressesData.service';
import { AppComponent } from '../../../../app.component';
import { UserModel } from '../../../../_models/user.model';
import { UserAddressesModel } from '../../../../_models/userAddresses.model';
import { ApiConnectorService } from '../../../../_service/_api/api-connector.service';
import {Title} from "@angular/platform-browser";

@Component({
  selector: 'app-all-addresses',
  templateUrl: './all-addresses.component.html',
  styleUrls: ['./all-addresses.component.scss']
})
export class AllAddressesComponent implements OnInit {
  public user!: UserModel;
  public deliveryAddresses: UserAddressesModel[] = [];
  public invoiceAddresses: UserAddressesModel[] = [];

  private count: number = 0;

  constructor(
    private userAddressDataService: UserAddressesDataService,
    private api: ApiConnectorService,
    private router: Router,
    private title: Title
  ) {}

  ngOnInit(): void {
    AppComponent.isLoading = true;

    this.api.getJwtPayload().then((payload: any) => {
      this.userAddressDataService.userAddresses$.subscribe(
        (userAddresses: UserAddressesModel[]) => {
          if (
            (userAddresses.length == 0 && this.count < 1) ||
            (userAddresses == undefined && this.count < 1)
          ) {
            this.userAddressDataService.getByUserId(payload.userId);
            this.count = 1;
          }

          this.deliveryAddresses = [];
          this.invoiceAddresses = [];

          userAddresses.forEach((address) => {
            if (address.type === '0') {
              this.invoiceAddresses.push(address);
            } else {
              this.deliveryAddresses.push(address);
            }
          });
        }
      );
    });

    this.title.setTitle("F1 Webshop | All Addresses");

    AppComponent.isLoading = false;
  }

  public async changeURL(event: UserAddressesModel, type: string): Promise<void> {
    let encryptedId: string = CryptoJs.Rabbit.encrypt(
      event.id,
      await this.api.getDecryptKey()
    ).toString();
    const id = encryptedId.replace(new RegExp('/', 'g'), '*');
    await this.router.navigate(['dashboard', 'user', 'addresses', id], {
      queryParams: {
        type: type
      }
    });
  }
}
