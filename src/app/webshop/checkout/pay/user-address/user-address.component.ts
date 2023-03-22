import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {UserAddressesModel} from '../../../../_models/userAddresses.model';
import {Router} from '@angular/router';
import {AppComponent} from "../../../../app.component";
import {ToastrService} from "ngx-toastr";
import { UserDataService } from 'src/app/_service/_data/userData.service';
import {UserAddressesDataService} from "../../../../_service/_data/userAddressesData.service";

@Component({
  selector: 'app-user-address',
  templateUrl: './user-address.component.html',
  styleUrls: ['./user-address.component.scss']
})
export class UserAddressComponent implements OnInit {
  @Input() public address: UserAddressesModel | undefined = undefined;
  @Input() public type: string | null = null;
  @Input() public redirectUrl: string | null = null;
  @Output() public select: EventEmitter<UserAddressesModel> = new EventEmitter();

  constructor(private router: Router, private toastr: ToastrService, private userAddressDataService: UserAddressesDataService) {}

  ngOnInit(): void {}

  public selectAddress(): void {
    this.select.emit(this.address);
  }

  public createAddress(): void {
    this.router.navigate(['dashboard', 'user', 'addresses', 'create'], {
      queryParams: {
        redirectURI: this.redirectUrl,
        type: this.type
      }
    });
  }

  public removeAddress(): void {
    AppComponent.isLoading = true;

    if (this.address != undefined) {
      this.userAddressDataService
        .deleteUserAddress(this.address?.id)
        .then((res) => {
          this.toastr.success(
            'Addresses has been deleted successfully',
            'Success!'
          );
          // this.router.navigate(['dashboard', 'user', 'addresses']);
        });
    }

    AppComponent.isLoading = false;
  }
}
