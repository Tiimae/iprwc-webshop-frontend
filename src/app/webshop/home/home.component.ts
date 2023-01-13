import {Component, OnInit} from '@angular/core';
import {ProductDataService} from "../../_service/data/productData.service";
import {ProductModel} from "../../_models/product.model";
import {AuthService} from "../../_service/auth.service";
import {ApiConnectorService} from "../../_service/api-connector.service";
import {CategoryDataService} from "../../_service/data/categoryData.service";
import {CategoryModel} from "../../_models/category.model";

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {

  products: ProductModel[] = []
  categories: CategoryModel[] = []

  productsToShow: ProductModel[] = []

  constructor(
    private productDataService: ProductDataService,
    private categoryService: CategoryDataService,
    private authService: AuthService,
    private api: ApiConnectorService
  ) {
  }

  async ngOnInit(): Promise<void> {

    const jwtToken = localStorage.getItem('blank-token');

    if (localStorage.getItem('blank-token') !== null) {
      try {
        const secret = await this.authService.getSecret();

        setTimeout(() => {
          localStorage.clear();

          this.api.storeJwtToken(
            jwtToken ?? '',
            secret.data['message']
          );

          location.reload()
        }, 500)
      } catch (error) {
        localStorage.clear();
      }
    }

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

    await this.categoryService.getAllCategories();
    this.categoryService.categories$.subscribe({
      next: (products: CategoryModel[]) => {
        this.categories = products;
      },
      error(e: Error) {
        throw new Error(e.message);
      },
      complete: () => {
        console.log("complete")
      }
    })

    setTimeout(() => {
      this.productsToShow = this.products;
    }, 100)
  }

  showProducts(category: string): void {
    this.productsToShow = [];

    if (category === 'all') {
      this.productsToShow = this.products;
      return;
    }

    this.products.forEach(product => {
      if (product.category.categoryName === category) {
        this.productsToShow.push(product);
      }
    })
  }

}
