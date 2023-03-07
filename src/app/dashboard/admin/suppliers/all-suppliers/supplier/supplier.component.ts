import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import * as CryptoJs from 'crypto-js';
import { SupplierModel } from '../../../../../_models/supplier.model';
import { ApiConnectorService } from '../../../../../_service/_api/api-connector.service';

@Component({
  selector: 'app-supplier',
  templateUrl: './supplier.component.html',
  styleUrls: ['./supplier.component.scss']
})
export class SupplierComponent implements OnInit {
  @Input() public  supplier!: SupplierModel;

  public supplierId: string | undefined;

  @Output() public delete: EventEmitter<SupplierModel> = new EventEmitter();

  constructor(private api: ApiConnectorService) {}

  ngOnInit(): void {
    this.checkIfIdIsUndefined();
  }

  public async checkIfIdIsUndefined(): Promise<void> {
    let encryptedId: string = CryptoJs.Rabbit.encrypt(
      this.supplier.id,
      await this.api.getDecryptKey()
    ).toString();
    this.supplierId = encryptedId.replace(new RegExp('/', 'g'), '*');
  }

  public removeSupplier(): void {
    this.delete.emit(this.supplier);
  }
}
