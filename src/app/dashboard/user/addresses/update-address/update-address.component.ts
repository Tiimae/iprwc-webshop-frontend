import {Component, OnInit} from '@angular/core';
import {FormControl, FormGroup, Validators} from "@angular/forms";
import {UserAddressesDataService} from "../../../../_service/data/userAddressesData.service";
import * as CryptoJs from "crypto-js";
import {ActivatedRoute, Router} from "@angular/router";
import {ApiConnectorService} from "../../../../_service/api-connector.service";
import {UserAddressesModel} from "../../../../_models/userAddresses.model";
import {AddressEnum} from "../../../../_enum/address.enum";
import {ToastrService} from "ngx-toastr";
import {UserModel} from "../../../../_models/user.model";
import {UserDataService} from 'src/app/_service/data/userData.service';

@Component({
  selector: 'app-update-address',
  templateUrl: './update-address.component.html',
  styleUrls: ['./update-address.component.scss']
})
export class UpdateAddressComponent implements OnInit {
  addressUpdateForm = new FormGroup({
    street: new FormControl('', [Validators.required]),
    number: new FormControl('', [Validators.required]),
    additional: new FormControl(''),
    zipcode: new FormControl('', [Validators.required,]),
    city: new FormControl('', [Validators.required]),
    country: new FormControl('', [Validators.required]),
  })

  addressId!: string;

  user!: UserModel | undefined;

  constructor(
    private userAddressDataService: UserAddressesDataService,
    private userDataService: UserDataService,
    private route: ActivatedRoute,
    private api: ApiConnectorService,
    private router: Router,
    private toastr: ToastrService,
  ) {
  }

  ngOnInit(): void {
    this.api.getJwtPayload().then(payload => {
      this.userDataService.getCurrentUser(payload.userId).subscribe(res => {
        this.user = res
      })

      this.route.params.subscribe(async (params) => {
        const currentBrandId = params['addressId'].replaceAll("*", "/");
        this.addressId = CryptoJs.Rabbit.decrypt(currentBrandId, await this.api.getDecryptKey()).toString(CryptoJs.enc.Utf8);

        setTimeout(() => {
          this.userAddressDataService.getByAddressId(this.addressId, payload.userId).subscribe(res => {
            if (res == undefined) {
              this.router.navigate(['dashboard', 'user', 'addresses'])
              return;
            }

            this.addressUpdateForm.controls.street.setValue(res.street)
            this.addressUpdateForm.controls.number.setValue(res.houseNumber.toString())
            this.addressUpdateForm.controls.additional.setValue(res.addition)
            this.addressUpdateForm.controls.zipcode.setValue(res.zipcode)
            this.addressUpdateForm.controls.city.setValue(res.city)
            this.addressUpdateForm.controls.country.setValue(res.country)
          })
        }, 200)
      })
    })
  }

  onSubmit(): void {
    const deliveryStreet = this.addressUpdateForm.controls.street.value
    const deliveryNumber = this.addressUpdateForm.controls.number.value
    const deliveryAdditional = this.addressUpdateForm.controls.additional.value
    const deliveryZipcode = this.addressUpdateForm.controls.zipcode.value
    const deliveryCity = this.addressUpdateForm.controls.city.value
    const deliveryCountry = this.addressUpdateForm.controls.country.value

    if (deliveryStreet == null || deliveryNumber == null || deliveryZipcode == null || deliveryCity == null || deliveryCountry == null || this.user == undefined) {
      this.toastr.error('Something is wrong!', 'Failed');
      return;
    }

    if (deliveryZipcode.length > 6 || deliveryZipcode.length < 6 && deliveryZipcode.includes(' ')) {
      this.toastr.error('Incorrect zip Code', 'Failed');
      return;
    }

    if (!this.addressUpdateForm.valid) {
      this.toastr.error('Something is wrong!', 'Failed');
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
      this.route.snapshot.queryParamMap.get("type") == 'delivery' ? AddressEnum.DELIVERY.toString() : AddressEnum.INVOICE.toString(),
      this.user
    )

    this.userAddressDataService.updateUserAddress(deliveryAddress).then(res => {
      if (this.user != undefined) {
        this.user.addresses[this.user.addresses.findIndex(currentAddress => currentAddress.id === this.addressId)] = res
        this.userDataService.updateUser(this.user);
      }

      this.toastr.success("Addresses has been updated successfully", "Success!");
      this.router.navigate(['dashboard', 'user', 'addresses']);
    })
  }

  removeAddress(): void {
    this.userAddressDataService.deleteUserAddress(this.addressId).then(res => {
      if (this.user != undefined) {
        this.user.addresses.splice(this.user.addresses.findIndex(currentAddress => currentAddress.id === this.addressId), 1)
        this.userDataService.updateUser(this.user);
      }

      this.toastr.success("Addresses has been deleted successfully", "Success!");
      this.router.navigate(['dashboard', 'user', 'addresses']);
    })
  }

}