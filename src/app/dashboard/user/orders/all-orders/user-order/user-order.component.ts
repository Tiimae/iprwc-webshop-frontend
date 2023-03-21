import {Component, Input, OnInit} from '@angular/core';
import {OrderModel} from '../../../../../_models/order.model';

@Component({
  selector: 'app-user-order',
  templateUrl: './user-order.component.html',
  styleUrls: ['./user-order.component.scss']
})
export class UserOrderComponent implements OnInit {
  @Input() order!: OrderModel;

  constructor() {}

  ngOnInit(): void {}
}
