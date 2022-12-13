import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {UserModel} from "../../../../../_models/user.model";
import {SupplierModel} from "../../../../../_models/supplier.model";
import * as CryptoJs from "crypto-js";
import {ApiConnectorService} from "../../../../../_service/api-connector.service";

@Component({
  selector: 'app-supplier',
  templateUrl: './supplier.component.html',
  styleUrls: ['./supplier.component.scss']
})
export class SupplierComponent implements OnInit {

  @Input() supplier!: SupplierModel;

  supplierId: string | undefined;

  @Output() delete: EventEmitter<SupplierModel> = new EventEmitter();

  constructor() {
  }

  ngOnInit(): void {
    this.checkIfIdIsUndefined();
  }

  async checkIfIdIsUndefined() {
    let encryptedId: string = CryptoJs.Rabbit.encrypt(this.supplier.id, await ApiConnectorService.getInstance().getDecryptKey()).toString()
    this.supplierId = encryptedId.replace(new RegExp("/", "g"), "*");
  }

  removeSupplier() {
    this.delete.emit(this.supplier);
  }

}
