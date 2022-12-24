import { Component, OnInit } from '@angular/core';
import { CartDataService } from 'src/app/_service/data/cartData.service';
import {ProductModel} from "../../_models/product.model";

@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.scss']
})
export class CartComponent implements OnInit {

  cartProducts!: ProductModel[];
  totalProduct: number = 0;

  constructor(
    private cartDataService: CartDataService
  ) { }

  ngOnInit(): void {

    this.cartDataService
      .products$
      .subscribe(res => {
        this.cartProducts = res;
      })

    console.log(this.cartProducts)

  }

  calculateTotalProduct() {

  }



}
