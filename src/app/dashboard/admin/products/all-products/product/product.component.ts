import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import * as CryptoJs from 'crypto-js';
import { ProductModel } from '../../../../../_models/product.model';
import { ApiConnectorService } from '../../../../../_service/_api/api-connector.service';

@Component({
  selector: 'app-product',
  templateUrl: './product.component.html',
  styleUrls: ['./product.component.scss']
})
export class ProductComponent implements OnInit {
  public productId: string = '';
  @Input() public product!: ProductModel;
  @Input() public deleted!: boolean;

  @Output() public delete: EventEmitter<ProductModel> = new EventEmitter();

  constructor(private api: ApiConnectorService) {}

  ngOnInit(): void {
    this.checkIfEmpty();
  }
  
  private async checkIfEmpty() {
    let encryptedId: string = CryptoJs.Rabbit.encrypt(
      this.product.id,
      await this.api.getDecryptKey()
    ).toString();
    this.productId = encryptedId.toString().replace(new RegExp('/', 'g'), '*');
  }

  public removeProduct(): void {
    this.delete.emit(this.product);
  }
}
