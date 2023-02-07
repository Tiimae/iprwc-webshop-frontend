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
  productId: string = '';
  @Input() product!: ProductModel;
  @Input() deleted!: boolean;

  @Output() delete: EventEmitter<ProductModel> = new EventEmitter();

  constructor(private api: ApiConnectorService) {}

  async ngOnInit(): Promise<void> {
    let encryptedId: string = CryptoJs.Rabbit.encrypt(
      this.product.id,
      await this.api.getDecryptKey()
    ).toString();
    this.productId = encryptedId.toString().replace(new RegExp('/', 'g'), '*');
  }

  removeProduct(): void {
    this.delete.emit(this.product);
  }
}
