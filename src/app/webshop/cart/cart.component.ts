import {Component, OnInit} from '@angular/core';
import {CartDataService} from 'src/app/_service/data/cartData.service';
import {ProductModel} from "../../_models/product.model";
import {Router} from "@angular/router";
import { ToastrService } from 'ngx-toastr';

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
    private cartDataService: CartDataService,
    private router: Router,
    private toastr: ToastrService
  ) {
  }

  ngOnInit(): void {

    this.cartDataService
      .products$
      .subscribe({
        next: (products: ProductModel[]) => {
          this.cartProducts = products;
          setTimeout(() => {
            this.calculateTotalProduct();
          }, 200)
        },
        error(e: Error) {
          throw new Error(e.message);
        },
        complete: () => {
          console.log("complete")
        }
      })
  }

  calculateTotalProduct() {
    const allTotal = document.getElementsByClassName("product-line-price");
    let total = 0;

    for (let i = 1; i < allTotal.length; i++) {
      const lineTotal = allTotal[i].innerHTML.substring(1).replace(",", "")
      total += Number(lineTotal)
    }

    this.totalProduct = total
    this.tax = this.totalProduct * 0.21
    this.grandTotal = this.totalProduct + this.tax;
  }

  toCheckout(): void {
    if (this.cartProducts.length == 0) {
      this.toastr.error("Your cart cannot be empty to go to checkout!", "Failed")
      return;
    }

    this.router.navigate(['checkout', 'address'])
  }

}
