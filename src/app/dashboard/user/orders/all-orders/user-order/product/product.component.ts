import { Component, Input, OnInit } from '@angular/core';
import { OrderProductModel } from '../../../../../../_models/orderProduct.model';

@Component({
  selector: 'app-product-order',
  templateUrl: './product.component.html',
  styleUrls: ['./product.component.scss']
})
export class ProductComponent implements OnInit {
  @Input() orderProduct!: OrderProductModel;

  constructor() {}

  ngOnInit(): void {}
}
