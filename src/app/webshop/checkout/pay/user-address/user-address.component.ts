import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {UserAddressesModel} from "../../../../_models/userAddresses.model";

@Component({
  selector: 'app-user-address',
  templateUrl: './user-address.component.html',
  styleUrls: ['./user-address.component.scss']
})
export class UserAddressComponent implements OnInit {

  @Input() address!: UserAddressesModel;
  @Output() select: EventEmitter<UserAddressesModel> = new EventEmitter;

  constructor() {
  }

  ngOnInit(): void {

  }

  selectAddress() {
    this.select.emit(this.address);
  }

}
