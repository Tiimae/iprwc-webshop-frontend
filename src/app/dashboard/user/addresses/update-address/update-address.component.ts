import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import * as CryptoJs from 'crypto-js';
import { ToastrService } from 'ngx-toastr';
import { UserDataService } from 'src/app/_service/_data/userData.service';
import { AppComponent } from '../../../../app.component';
import { AddressEnum } from '../../../../_enum/address.enum';
import { UserModel } from '../../../../_models/user.model';
import { UserAddressesModel } from '../../../../_models/userAddresses.model';
import { ApiConnectorService } from '../../../../_service/_api/api-connector.service';
import { UserAddressesDataService } from '../../../../_service/_data/userAddressesData.service';
import {Title} from "@angular/platform-browser";

@Component({
  selector: 'app-update-address',
  templateUrl: './update-address.component.html',
  styleUrls: ['./update-address.component.scss']
})
export class UpdateAddressComponent implements OnInit {
  public addressUpdateForm: FormGroup = new FormGroup({
    street: new FormControl('', [Validators.required]),
    number: new FormControl('', [Validators.required]),
    additional: new FormControl(''),
    zipcode: new FormControl('', [Validators.required]),
    city: new FormControl('', [Validators.required]),
    country: new FormControl('', [Validators.required])
  });

  public addressId!: string;
  public address!: UserAddressesModel;
  public user!: UserModel | undefined;

  constructor(
    private userAddressDataService: UserAddressesDataService,
    private userDataService: UserDataService,
    private route: ActivatedRoute,
    private api: ApiConnectorService,
    private router: Router,
    private toastr: ToastrService,
    private title: Title
  ) {}

  ngOnInit(): void {
    AppComponent.isLoading = true;

    this.api.getJwtPayload().then((payload) => {
      this.userDataService.getCurrentUser(payload.userId).subscribe((res) => {
        if (res == undefined) {
          this.userDataService.getUserByRequest(payload.userId).then((res) => {
            this.user = res.data.payload;
          });
        } else {
          this.user = res;
        }
      });

      this.route.params.subscribe(async (params) => {
        this.addressId = params['addressId']
        setTimeout(() => {
          this.userAddressDataService
            .getByAddressId(this.addressId)
            .then((res) => {
              this.address = res.data.payload;
              this.setFormData();
            });
        }, 200);
      });
    });

    AppComponent.isLoading = false;
  }

  private setFormData(): void {
    this.addressUpdateForm.controls['street'].setValue(this.address.street);
    this.addressUpdateForm.controls['number'].setValue(
      this.address.houseNumber.toString()
    );
    this.addressUpdateForm.controls['additional'].setValue(this.address.addition);
    this.addressUpdateForm.controls['zipcode'].setValue(this.address.zipcode);
    this.addressUpdateForm.controls['city'].setValue(this.address.city);
    this.addressUpdateForm.controls['country'].setValue(this.address.country);

    this.title.setTitle(`F1 Webshop | Update Address - ${this.address.street} ${this.address.houseNumber}`)
  }

  public onSubmit(): void {
    AppComponent.isLoading = true;

    const deliveryStreet = this.addressUpdateForm.controls['street'].value;
    const deliveryNumber = this.addressUpdateForm.controls['number'].value;
    const deliveryAdditional = this.addressUpdateForm.controls['additional'].value;
    const deliveryZipcode = this.addressUpdateForm.controls['zipcode'].value;
    const deliveryCity = this.addressUpdateForm.controls['city'].value;
    const deliveryCountry = this.addressUpdateForm.controls['country'].value;

    if (
      deliveryStreet == null ||
      deliveryNumber == null ||
      deliveryZipcode == null ||
      deliveryCity == null ||
      deliveryCountry == null ||
      this.user == undefined
    ) {
      this.toastr.error('Something is wrong!', 'Failed');
      AppComponent.isLoading = false;
      return;
    }

    if (
      deliveryZipcode.length > 6 ||
      (deliveryZipcode.length < 6 && deliveryZipcode.includes(' '))
    ) {
      this.toastr.error('Incorrect zip Code', 'Failed');
      AppComponent.isLoading = false;
      return;
    }

    if (!this.addressUpdateForm.valid) {
      this.toastr.error('Something is wrong!', 'Failed');

      AppComponent.isLoading = false;
      return;
    }

    const deliveryAddress = new UserAddressesModel(
      this.addressId,
      deliveryStreet,
      Number(deliveryNumber),
      deliveryAdditional == null ? '' : deliveryAdditional,
      deliveryZipcode,
      deliveryCity,
      deliveryCountry,
      this.route.snapshot.queryParamMap.get('type') == 'delivery'
        ? AddressEnum.DELIVERY.toString()
        : AddressEnum.INVOICE.toString(),
      this.user
    );

    this.userAddressDataService
      .updateUserAddress(deliveryAddress)
      .then((res) => {
        if (this.user != undefined) {
          this.user.addresses[
            this.user.addresses.findIndex(
              (currentAddress) => currentAddress.id === this.addressId
            )
          ] = res;
          this.userDataService.updateUser(this.user, false);
        }

        this.toastr.success(
          'Addresses has been updated successfully',
          'Success!'
        );
        this.router.navigate(['dashboard', 'user', 'addresses']);
      });

    AppComponent.isLoading = false;
  }

  public removeAddress(): void {
    AppComponent.isLoading = true;
    this.userAddressDataService
      .deleteUserAddress(this.addressId)
      .then((res) => {
        if (this.user != undefined) {
          this.user.addresses.splice(
            this.user.addresses.findIndex(
              (currentAddress) => currentAddress.id === this.addressId
            ),
            1
          );
          this.userDataService.updateUser(this.user, false);
        }

        this.toastr.success(
          'Addresses has been deleted successfully',
          'Success!'
        );
        this.router.navigate(['dashboard', 'user', 'addresses']);
      });

    AppComponent.isLoading = false;
  }
}
