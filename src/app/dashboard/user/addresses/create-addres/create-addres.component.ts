import {Component, OnInit} from '@angular/core';
import {FormControl, FormGroup, Validators} from "@angular/forms";
import {ToastrService} from "ngx-toastr";
import {UserDataService} from "../../../../_service/data/userData.service";
import {ActivatedRoute, Router} from "@angular/router";
import {UserAddressesDataService} from "../../../../_service/data/userAddressesData.service";
import {ApiConnectorService} from "../../../../_service/api-connector.service";
import {UserModule} from "../../user.module";
import {UserModel} from "../../../../_models/user.model";
import {UserAddressesModel} from "../../../../_models/userAddresses.model";
import {AddressEnum} from "../../../../_enum/address.enum";
import {AddressesModule} from "../addresses.module";

@Component({
  selector: 'app-create-addres',
  templateUrl: './create-addres.component.html',
  styleUrls: ['./create-addres.component.scss']
})
export class CreateAddresComponent implements OnInit {

  addressForm = new FormGroup({
    street: new FormControl('', [Validators.required]),
    number: new FormControl('', [Validators.required]),
    additional: new FormControl(''),
    zipcode: new FormControl('', [Validators.required,]),
    city: new FormControl('', [Validators.required]),
    country: new FormControl('', [Validators.required]),
  })

  user!: UserModel | undefined;

  constructor(
    private customerAddress: UserAddressesDataService,
    private api: ApiConnectorService,
    private userDataService: UserDataService,
    private router: Router,
    private toastr: ToastrService,
    private route: ActivatedRoute
  ) {
  }

  ngOnInit(): void {
    this.api.getJwtPayload().then(payload => {
      setTimeout(() => {
        this.userDataService.getCurrentUser(payload.userId).subscribe(res => {
          this.user = res;

          if (this.user == undefined) {
            this.router.navigate(['checkout', 'pay'])
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

    if (deliveryStreet == null || deliveryNumber == null || deliveryZipcode == null || deliveryCity == null || deliveryCountry == null || this.user == undefined) {
      this.toastr.error('Something is wrong!', 'Failed');
      return;
    }

    if(deliveryZipcode.length > 6 || deliveryZipcode.length < 6 && deliveryZipcode.includes(' ')) {
      this.toastr.error('Incorrect zip Code', 'Failed');
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
      this.route.snapshot.queryParamMap.get("type") == 'delivery' ? AddressEnum.DELIVERY.toString() : AddressEnum.INVOICE.toString(),
      this.user
    )

    this.customerAddress.createUserAddress(deliveryAddress).then(res => {
      if (this.user != undefined) {
        this.user?.addresses.push(res)
        this.userDataService.updateUser(this.user);
      }
      this.toastr.success("Addresses has been added successfully", "Success!");
      if (this.route.snapshot.queryParamMap.has("redirectURI")) {
        // @ts-ignore
        const redirect!: string[] = this.route.snapshot.queryParamMap.get("redirectURI").split("/")
        console.log(redirect)
        this.router.navigate(redirect);
      }
    })
  }

}
