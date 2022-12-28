import {Component, OnInit} from '@angular/core';
import {FormControl, FormGroup, Validators} from "@angular/forms";
import {UserAddressesDataService} from "../../../_service/data/userAddressesData.service";
import {ApiConnectorService} from "../../../_service/api-connector.service";
import {UserAddressesModel} from "../../../_models/userAddresses.model";
import {UserDataService} from "../../../_service/data/userData.service";
import {UserModel} from "../../../_models/user.model";
import {Router} from "@angular/router";

@Component({
  selector: 'app-customer-addresses',
  templateUrl: './customer-addresses.component.html',
  styleUrls: ['./customer-addresses.component.scss']
})
export class CustomerAddressesComponent implements OnInit {

  addressForm = new FormGroup({
    street: new FormControl('', [Validators.required]),
    number: new FormControl('', [Validators.required]),
    additional: new FormControl('', [Validators.required]),
    zipcode: new FormControl('', [Validators.required,]),
    city: new FormControl('', [Validators.required]),
    country: new FormControl('', [Validators.required]),
  })

  addressInvoiceForm = new FormGroup({
    street: new FormControl('', [Validators.required]),
    number: new FormControl('', [Validators.required]),
    additional: new FormControl(''),
    zipcode: new FormControl('', [Validators.required,]),
    city: new FormControl('', [Validators.required]),
    country: new FormControl('', [Validators.required]),
  })

  invoiceChecker: boolean = true
  addresses: UserAddressesModel[] = [];
  user: UserModel | undefined;


  constructor(
    private customerAddress: UserAddressesDataService,
    private api: ApiConnectorService,
    private userDataService: UserDataService,
    private router: Router
  ) {
  }

  ngOnInit(): void {
    this.api.getJwtPayload().then(payload => {
      this.userDataService.getCurrentUser(payload.userId).subscribe(res => {
        this.user = res;
      });

      this.customerAddress.getByUserId(payload.userId).subscribe(res => {
        this.addresses = res;

        if (this.addresses != []) {
          if (this.addresses.length > 2) {
            return;
          }

          if (this.addresses[0] !== this.addresses[1]) {
            this.invoiceChecker = false;
          }

          this.addresses.forEach(address => {
            if (address.type == "delivery") {
              this.addressForm.controls.street.setValue(address.street)
              this.addressForm.controls.number.setValue(String(address.houseNumber))
              this.addressForm.controls.additional.setValue(address.addition)
              this.addressForm.controls.zipcode.setValue(address.zipcode)
              this.addressForm.controls.city.setValue(address.city)
              this.addressForm.controls.country.setValue(address.country)
            }

            if (address.type == "invoice" && !this.invoiceChecker) {
              this.addressInvoiceForm.controls.street.setValue(address.street)
              this.addressInvoiceForm.controls.number.setValue(String(address.houseNumber))
              this.addressInvoiceForm.controls.additional.setValue(address.addition)
              this.addressInvoiceForm.controls.zipcode.setValue(address.zipcode)
              this.addressInvoiceForm.controls.city.setValue(address.city)
              this.addressInvoiceForm.controls.country.setValue(address.country)
            }
          })
        }
      })
    })
  }

  onSubmit(): void {
    const deliveryStreet = this.addressForm.controls.street.value
    const deliveryNumber = this.addressForm.controls.number.value
    const deliveryAdditional = this.addressForm.controls.additional.value
    const deliveryZipcode = this.addressForm.controls.zipcode.value
    const deliveryCity = this.addressForm.controls.city.value
    const deliveryCountry = this.addressForm.controls.country.value

    if (this.addresses == []) {
      this.router.navigate([]);
    }

    if (deliveryStreet == null || deliveryNumber == null || deliveryAdditional == null || deliveryZipcode == null || deliveryCity == null || deliveryCountry == null || this.user == undefined) {
      return;
    }

    if (!this.addressForm.valid) {
      return;
    }

    if (this.invoiceChecker) {
      const addresses = [];
      const deliveryAddress = new UserAddressesModel(
        "",
        deliveryStreet,
        Number(deliveryNumber),
        deliveryAdditional,
        deliveryZipcode,
        deliveryCity,
        deliveryCountry,
        "delivery",
        this.user
      )

      const invoiceAddress = new UserAddressesModel(
        "",
        deliveryStreet,
        Number(deliveryNumber),
        deliveryAdditional,
        deliveryZipcode,
        deliveryCity,
        deliveryCountry,
        "invoice",
        this.user
      )

      addresses.push(deliveryAddress)
      addresses.push(invoiceAddress)
    } else {

    }
  }

  changeChecker(): void {
    this.invoiceChecker = !this.invoiceChecker;
  }
}
