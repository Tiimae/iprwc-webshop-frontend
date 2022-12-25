import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import { CartDataService } from 'src/app/_service/data/cartData.service';
import {ProductModel} from "../../../_models/product.model";

@Component({
  selector: 'app-cart-item',
  templateUrl: './cart-item.component.html',
  styleUrls: ['./cart-item.component.scss']
})
export class CartItemComponent implements OnInit {

  @Input() product!: ProductModel;
  amount!: number;
  totalPrice!: number;

  @Output() delete: EventEmitter<ProductModel> = new EventEmitter
  @Output() change: EventEmitter<void> = new EventEmitter

  constructor(
    private cartDataService: CartDataService
  ) { }

  ngOnInit(): void {

    const localStorageItem = JSON.parse(this.cartDataService.getCartItem(this.product.id));
    this.amount = localStorageItem.amount
    this.totalPrice = this.product.price * this.amount;

  }

  changePrice(event: any) {
    let newQuantity = event.target.value
    if (newQuantity < 1) {
      event.target.value = 1;
      newQuantity = 1
    }

    this.amount = newQuantity;

    this.totalPrice = this.product.price * this.amount;

    this.cartDataService.createProduct(this.product, this.amount)

    this.change.emit();
  }

  deleteProduct() {
    this.cartDataService.removeProduct(this.product)

    // this.delete.emit(this.product);
  }

}
