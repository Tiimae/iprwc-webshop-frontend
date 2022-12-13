import {Component, OnInit} from '@angular/core';
import {ProductDataService} from "../../../../_service/data/productData.service";
import {ProductModel} from "../../../../_models/product.model";

@Component({
  selector: 'app-all-products',
  templateUrl: './all-products.component.html',
  styleUrls: ['./all-products.component.scss']
})
export class AllProductsComponent implements OnInit {

  allProducts: ProductModel[] = [];

  constructor(
    private productDataService: ProductDataService
  ) { }

  ngOnInit(): void {
    this.productDataService
      .products$
      .subscribe({
        next: (products: ProductModel[]) => {
          this.allProducts = products;
        },
        error(e: Error) {
          throw new Error(e.message);
        },
        complete: () => {
          console.log("complete")
        }
      })
  }

  removeProductOutArray(event: ProductModel): void {
    this.productDataService.delete(event.id);
  }

}
