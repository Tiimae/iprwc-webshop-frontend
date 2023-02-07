import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import * as CryptoJs from 'crypto-js';
import { BrandModel } from '../../../../../_models/brand.model';
import { ApiConnectorService } from '../../../../../_service/_api/api-connector.service';

@Component({
  selector: 'app-brand',
  templateUrl: './brand.component.html',
  styleUrls: ['./brand.component.scss']
})
export class BrandComponent implements OnInit {
  @Input() brand!: BrandModel;
  @Output() delete: EventEmitter<BrandModel> = new EventEmitter<BrandModel>();

  brandId!: string;

  constructor(private api: ApiConnectorService) {}

  ngOnInit(): void {
    this.checkIfIdIsUndefined();
  }

  public removeUser(): void {
    this.delete.emit(this.brand);
  }

  public async checkIfIdIsUndefined(): Promise<void> {
    let encryptedId: string = CryptoJs.Rabbit.encrypt(
      this.brand.id,
      await this.api.getDecryptKey()
    ).toString();
    this.brandId = encryptedId.replace(new RegExp('/', 'g'), '*');
  }
}
