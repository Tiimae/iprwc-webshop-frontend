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
  tax: number = 0;
  grandTotal: number = 0;

  constructor(
    private cartDataService: CartDataService
  ) { }

  ngOnInit(): void {

    this.cartDataService
      .products$
      .subscribe(res => {
        this.cartProducts = res;
      })

    setTimeout(() => {
      this.calculateTotalProduct();
    }, 200)

  }

  calculateTotalProduct() {
    const allTotal = document.getElementsByClassName("product-line-price");
    let total = 0;

    for (let i = 1; i < allTotal.length; i++) {
      total += Number(allTotal[i].innerHTML.substring(1))
    }


    this.totalProduct = total
    this.tax = this.totalProduct * 0.05
    this.grandTotal = this.totalProduct + this.tax;
  }



}
