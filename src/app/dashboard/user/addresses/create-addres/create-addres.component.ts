import {Component, OnInit} from '@angular/core';
import {FormControl, FormGroup, Validators} from '@angular/forms';
import {ActivatedRoute, Router} from '@angular/router';
import {ToastrService} from 'ngx-toastr';
import {AppComponent} from '../../../../app.component';
import {AddressEnum} from '../../../../_enum/address.enum';
import {UserModel} from '../../../../_models/user.model';
import {UserAddressesModel} from '../../../../_models/userAddresses.model';
import {ApiConnectorService} from '../../../../_service/_api/api-connector.service';
import {UserAddressesDataService} from '../../../../_service/_data/userAddressesData.service';
import {UserDataService} from '../../../../_service/_data/userData.service';
import {Title} from "@angular/platform-browser";

@Component({
  selector: 'app-create-addres',
  templateUrl: './create-addres.component.html',
  styleUrls: ['./create-addres.component.scss']
})
export class CreateAddresComponent implements OnInit {
  public addressForm: FormGroup = new FormGroup({
    street: new FormControl('', [Validators.required]),
    number: new FormControl('', [Validators.required]),
    additional: new FormControl(''),
    zipcode: new FormControl('', [Validators.required]),
    city: new FormControl('', [Validators.required]),
    country: new FormControl('', [Validators.required])
  });

  public user!: UserModel | undefined;

  constructor(
    private customerAddress: UserAddressesDataService,
    private api: ApiConnectorService,
    private userDataService: UserDataService,
    private router: Router,
    private toastr: ToastrService,
    private route: ActivatedRoute,
    private title: Title
  ) {}

  ngOnInit(): void {
    AppComponent.isLoading = true;

    this.api.getJwtPayload().then((payload: any) => {
      this.userDataService.getCurrentUser(payload.userId).subscribe((res) => {
        if (res == undefined) {
          this.userDataService.getUserByRequest(payload.userId).then((res) => {
            if (res.data.payload == undefined) {
              if (this.route.snapshot.queryParamMap.has('redirectURI')) {
                // @ts-ignore
                const redirect!: string[] = this.route.snapshot.queryParamMap
                  .get('redirectURI')
                  .split('/');

                this.router.navigate(redirect);
              }
            }

            this.user = res.data.payload;
          });
        } else {
          this.user = res;
        }
      });
    });

    this.title.setTitle("F1 Webshop | Create Address")

    AppComponent.isLoading = false;
  }

  onSubmit(): void {
    AppComponent.isLoading = true;

    const deliveryStreet = this.addressForm.controls['street'].value;
    const deliveryNumber = this.addressForm.controls['number'].value;
    const deliveryAdditional = this.addressForm.controls['additional'].value;
    const deliveryZipcode = this.addressForm.controls['zipcode'].value;
    const deliveryCity = this.addressForm.controls['city'].value;
    const deliveryCountry = this.addressForm.controls['country'].value;

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

    if (!this.addressForm.valid) {
      this.toastr.error('Something is wrong!', 'Failed');
      AppComponent.isLoading = false;
      return;
    }

    const deliveryAddress = new UserAddressesModel(
      '',
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

    this.customerAddress.createUserAddress(deliveryAddress).then((res) => {
      this.toastr.success('Addresses has been added successfully', 'Success!');
      if (this.route.snapshot.queryParamMap.has('redirectURI')) {
        // @ts-ignore
        const redirect!: string[] = this.route.snapshot.queryParamMap
          .get('redirectURI')
          .split('/');

        this.router.navigate(redirect);
      }
    });
    AppComponent.isLoading = false;
  }
}
