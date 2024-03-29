import {Component, Input, OnInit} from '@angular/core';
import {ProductModel} from '../../../_models/product.model';
import {ApiConnectorService} from '../../../_service/_api/api-connector.service';

@Component({
  selector: 'app-product',
  templateUrl: './product.component.html',
  styleUrls: ['./product.component.scss']
})
export class ProductComponent implements OnInit {
  @Input() public product!: ProductModel;
  public productId!: string;

  constructor(private api: ApiConnectorService) {}

  ngOnInit(): void {
    this.checkIfIdIsUndefined();
  }

  public async checkIfIdIsUndefined(): Promise<void> {
    // let encryptedId: string = CryptoJs.Rabbit.encrypt(
    //   this.product.id,
    //   AppComponent.pageDecryptKey
    // ).toString();
    // this.productId = encryptedId.replace(new RegExp('/', 'g'), '*');
    this.productId = this.product.id;
  }
}
