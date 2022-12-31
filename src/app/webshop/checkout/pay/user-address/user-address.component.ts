import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {UserAddressesModel} from "../../../../_models/userAddresses.model";
import {Router} from "@angular/router";

@Component({
  selector: 'app-user-address',
  templateUrl: './user-address.component.html',
  styleUrls: ['./user-address.component.scss']
})
export class UserAddressComponent implements OnInit {

  @Input() address: UserAddressesModel | undefined = undefined;
  @Input() type: string | null = null;
  @Output() select: EventEmitter<UserAddressesModel> = new EventEmitter;

  constructor(
    private router: Router
  ) {
  }

  ngOnInit(): void {

  }

  selectAddress() {
    this.select.emit(this.address);
  }

  createAddress(): void {
    this.router.navigate(["dashboard", "user", "addresses", "create"], {
      queryParams: {
        redirectURI: "checkout/pay",
        type: this.type,
      }
    })
  }


}
