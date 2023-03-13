import {Component, Input, OnInit} from '@angular/core';
import {Router} from '@angular/router';
import {ToastrService} from 'ngx-toastr';
import {CartDataService} from 'src/app/_service/_data/cartData.service';
import {AppComponent} from '../../app.component';
import {ProductModel} from '../../_models/product.model';
import {Title} from "@angular/platform-browser";

@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.scss']
})
export class CartComponent implements OnInit {
  public cartProducts!: ProductModel[];
  public totalProduct: number = 0;
  public tax: number = 0;
  public grandTotal: number = 0;

  @Input() public overview: boolean = false;

  private cartCheck: boolean = false;

  constructor(
    private cartDataService: CartDataService,
    private router: Router,
    private toastr: ToastrService,
    private title: Title
  ) {}

  ngOnInit(): void {
    AppComponent.isLoading = true;
    this.cartDataService.products$.subscribe({
      next: (products: ProductModel[]) => {
        if (products.length === 0 && !this.cartCheck) {
          this.cartDataService.getAllProductsInCart();
          this.cartCheck = true;
        }

        this.cartProducts = products;
        setTimeout(() => {
          this.calculateTotalProduct();
        }, 200);
      },
      error(e: Error) {
        throw new Error(e.message);
      },
      complete: () => {
        console.log('complete');
      }
    });

    this.title.setTitle("F1 Webshop | Cart")
    AppComponent.isLoading = false;
  }

  public calculateTotalProduct(): void {
    const allTotal = document.getElementsByClassName('product-line-price');
    let total = 0;

    for (let i = 0; i < allTotal.length; i++) {
      const lineTotal = allTotal[i].innerHTML.substring(1).replace(',', '');
      total += Number(lineTotal);
    }

    this.totalProduct = total;
    this.tax = this.totalProduct * 0.21;
    this.grandTotal = this.totalProduct + this.tax;
  }

  public toCheckout(): void {
    if (this.cartProducts.length == 0) {
      this.toastr.error(
        'Your cart cannot be empty to go to checkout!',
        'Failed'
      );
      return;
    }

    this.router.navigate(['checkout', 'pay']);
  }
}
