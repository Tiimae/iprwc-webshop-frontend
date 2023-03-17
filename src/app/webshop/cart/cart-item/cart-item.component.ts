import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {CartDataService} from 'src/app/_service/_data/cartData.service';
import {ProductModel} from '../../../_models/product.model';

@Component({
  selector: 'app-cart-item',
  templateUrl: './cart-item.component.html',
  styleUrls: ['./cart-item.component.scss']
})
export class CartItemComponent implements OnInit {
  @Input() public product!: ProductModel;
  @Input() public  overview!: boolean;
  @Input() public amount!: string;
  public totalPrice!: number;

  @Output() public change: EventEmitter<void> = new EventEmitter();

  constructor(private cartDataService: CartDataService) {}

  ngOnInit(): void {
    // const localStorageItem = JSON.parse(
    //   this.cartDataService.getCartItem(this.product.id)
    // );
    // this.amount = localStorageItem.amount;
    this.totalPrice = this.product.price * Number(this.amount);
  }

  public changePrice(event: any): void {
    let newQuantity = event.target.value;
    if (newQuantity < 1) {
      event.target.value = 1;
      newQuantity = 1;
    }

    this.amount = newQuantity;

    this.totalPrice = this.product.price * Number(this.amount);

    this.cartDataService.createProduct(this.product, Number(this.amount), false);

    this.change.emit();
  }

  public deleteProduct(): void {
    this.cartDataService.removeProduct(this.product);
  }
}
