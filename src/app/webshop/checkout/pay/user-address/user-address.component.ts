import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {UserAddressesModel} from '../../../../_models/userAddresses.model';
import {Router} from '@angular/router';

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

  constructor(private router: Router) {}

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
}
