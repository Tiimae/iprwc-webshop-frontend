import {Component, OnInit} from '@angular/core';
import {FormControl, FormGroup, Validators} from "@angular/forms";
import {UserAddressesDataService} from "../../../_service/data/userAddressesData.service";
import {ApiConnectorService} from "../../../_service/api-connector.service";
import {UserAddressesModel} from "../../../_models/userAddresses.model";
import {UserDataService} from "../../../_service/data/userData.service";
import {UserModel} from "../../../_models/user.model";
import {Router} from "@angular/router";
import {ToastrService} from "ngx-toastr";
import {AddressEnum} from "../../../_enum/address.enum";

@Component({
  selector: 'app-customer-addresses',
  templateUrl: './customer-addresses.component.html',
  styleUrls: ['./customer-addresses.component.scss']
})
export class CustomerAddressesComponent implements OnInit {

  addressForm = new FormGroup({
    street: new FormControl('', [Validators.required]),
    number: new FormControl('', [Validators.required]),
    additional: new FormControl(''),
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
    private router: Router,
    private toastr: ToastrService
  ) {
  }

  ngOnInit(): void {
    this.api.getJwtPayload().then(payload => {
      setTimeout(() => {
        this.userDataService.getCurrentUser(payload.userId).subscribe(res => {
          this.user = res;

          if (this.user != undefined) {
            if (this.user.addresses.length > 0) {
              this.router.navigate(['checkout', 'pay'])
            }
          }
        })
      }, 400)
    });
  }

  onSubmit(): void {
    const deliveryStreet = this.addressForm.controls.street.value
    const deliveryNumber = this.addressForm.controls.number.value
    const deliveryAdditional = this.addressForm.controls.additional.value
    const deliveryZipcode = this.addressForm.controls.zipcode.value
    const deliveryCity = this.addressForm.controls.city.value
    const deliveryCountry = this.addressForm.controls.country.value

    let invoiceAddress: UserAddressesModel;

    if (deliveryStreet == null || deliveryNumber == null || deliveryZipcode == null || deliveryCity == null || deliveryCountry == null || this.user == undefined) {
      this.toastr.error('Something is wrong!', 'Failed');
      return;
    }

    if (!this.addressForm.valid) {
      this.toastr.error('Something is wrong!', 'Failed');
      return;
    }

    const deliveryAddress = new UserAddressesModel(
      "",
      deliveryStreet,
      Number(deliveryNumber),
      deliveryAdditional == null ? '' : deliveryAdditional,
      deliveryZipcode,
      deliveryCity,
      deliveryCountry,
      AddressEnum.DELIVERY.toString(),
      this.user
    )

    if (this.invoiceChecker) {
      invoiceAddress = new UserAddressesModel(
        "",
        deliveryStreet,
        Number(deliveryNumber),
        deliveryAdditional == null ? '' : deliveryAdditional,
        deliveryZipcode,
        deliveryCity,
        deliveryCountry,
        AddressEnum.INVOICE.toString(),
        this.user
      )
    } else {
      const deliveryStreetInvoice = this.addressInvoiceForm.controls.street.value
      const deliveryNumberInvoice = this.addressInvoiceForm.controls.number.value
      const deliveryAdditionalInvoice = this.addressInvoiceForm.controls.additional.value
      const deliveryZipcodeInvoice = this.addressInvoiceForm.controls.zipcode.value
      const deliveryCityInvoice = this.addressInvoiceForm.controls.city.value
      const deliveryCountryInvoice = this.addressInvoiceForm.controls.country.value

      if (deliveryStreetInvoice == null || deliveryNumberInvoice == null || deliveryZipcodeInvoice == null || deliveryCityInvoice == null || deliveryCountryInvoice == null || this.user == undefined) {
        this.toastr.error('Something is wrong!', 'Failed');
        return;
      }

      if (!this.addressInvoiceForm.valid) {
        this.toastr.error('Something is wrong!', 'Failed');
        return;
      }

      invoiceAddress = new UserAddressesModel(
        "",
        deliveryStreetInvoice,
        Number(deliveryNumberInvoice),
        deliveryAdditionalInvoice == null ? '' : deliveryAdditionalInvoice,
        deliveryZipcodeInvoice,
        deliveryCityInvoice,
        deliveryCountryInvoice,
        AddressEnum.INVOICE.toString(),
        this.user
      )

    }

    this.customerAddress.createUserAddress(deliveryAddress).then(res => {
      this.customerAddress.createUserAddress(invoiceAddress).then(res2 => {
        this.toastr.success("Addresses has been added successfully", "Success!");
        this.router.navigate(['checkout', 'pay']);
      })
    })
  }

  changeChecker(): void {
    this.invoiceChecker = !this.invoiceChecker;
  }
}
