import { Component, Input, OnInit } from '@angular/core';
import { ProductModel } from '../../../_models/product.model';
import * as CryptoJs from 'crypto-js';
import { ApiConnectorService } from '../../../_service/api-connector.service';

@Component({
  selector: 'app-product',
  templateUrl: './product.component.html',
  styleUrls: ['./product.component.scss']
})
export class ProductComponent implements OnInit {
  @Input() product!: ProductModel;
  productId!: string;

  constructor(private api: ApiConnectorService) {}

  ngOnInit(): void {
    this.checkIfIdIsUndefined();
  }

  public async checkIfIdIsUndefined(): Promise<void> {
    let encryptedId: string = CryptoJs.Rabbit.encrypt(
      this.product.id,
      await this.api.getDecryptKey()
    ).toString();
    this.productId = encryptedId.replace(new RegExp('/', 'g'), '*');
  }
}
