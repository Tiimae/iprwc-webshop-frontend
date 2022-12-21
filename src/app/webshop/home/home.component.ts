import {Component, OnInit} from '@angular/core';
import {ProductDataService} from "../../_service/data/productData.service";
import {ProductModel} from "../../_models/product.model";

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {

  products: ProductModel[] = []

  constructor(
    private productDataService: ProductDataService
  ) {
  }

  ngOnInit(): void {

    this.productDataService
      .products$
      .subscribe({
        next: (products: ProductModel[]) => {
          this.products = products;
        },
        error(e: Error) {
          throw new Error(e.message);
        },
        complete: () => {
          console.log("complete")
        }
      })

  }

}
