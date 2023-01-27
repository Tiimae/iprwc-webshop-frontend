import {Component, HostListener, OnInit} from '@angular/core';
import {ProductDataService} from "../../_service/data/productData.service";
import {ProductModel} from "../../_models/product.model";
import {AuthService} from "../../_service/auth.service";
import {ApiConnectorService} from "../../_service/api-connector.service";
import {CategoryDataService} from "../../_service/data/categoryData.service";
import {CategoryModel} from "../../_models/category.model";
import {ActivatedRoute, Router} from "@angular/router";
import {AppComponent} from "../../app.component";

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {
  isLoading: boolean = false;

  products: ProductModel[] = []
  categories: CategoryModel[] = []

  productsToShow: ProductModel[] = []
  uri: boolean = false;

  constructor(
    private productDataService: ProductDataService,
    private categoryService: CategoryDataService,
    private authService: AuthService,
    private api: ApiConnectorService,
    private route: ActivatedRoute,
  ) {
  }

  async ngOnInit(): Promise<void> {
    AppComponent.isLoading = true;
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

    await this.productDataService
      .products$
      .subscribe({
        next: (products: ProductModel[]) => {
          this.products = products;
          this.productsToShow = this.products
          this.productsToShow.sort((a, b) => {
            if (a.productName < b.productName) {
              return -1;
            }
            if (a.productName > b.productName) {
              return 1;
            }
            return 0;
          });
        },
        error(e: Error) {
          throw new Error(e.message);
        },
        complete: () => {
          console.log("complete")
        }
      })

    await this.categoryService.getAllCategories();
    await this.categoryService.categories$.subscribe({
      next: (category: CategoryModel[]) => {
        this.categories = category.sort((a, b) => {
          if (a.categoryName < b.categoryName) {
            return -1;
          }
          if (a.categoryName > b.categoryName) {
            return 1;
          }
          return 0;
        });

        this.reveal(null)
      },
      error(e: Error) {
        throw new Error(e.message);
      },
      complete: () => {
        console.log("complete")
      }
    })

    this.route.url.subscribe(res => {
      if (res[0] != undefined) {
        this.uri = true
      }
    })

    this.route.queryParams.subscribe(params => {
      if (params["search"] != null) {
        this.productsToShow = []
        this.products.forEach(product => {
          if (product.productName.toLowerCase().includes(params["search"].toLowerCase()) || product.category.categoryName.toLowerCase().includes(params["search"].toLowerCase())) {
            this.productsToShow.push(product)
          }
        })
      }
    })

    setTimeout(() => {
      this.reveal(null)
      AppComponent.isLoading = false;
    }, 1000)
  }

  showProducts(category: string): void {
    this.productsToShow = [];

    if (category === 'all'
    ) {
      this.productsToShow = this.products;
      setTimeout(() => {
        this.reveal(null)
      }, 200)
      return;
    }

    this.products.forEach(product => {
      if (product.category.categoryName === category) {
        this.productsToShow.push(product);
      }
    })

    setTimeout(() => {
      this.reveal(null)
    }, 200)
  }

  @HostListener('window:scroll', ['$event'])
  reveal(event: any): void {
    const reveals = document.querySelectorAll(".reveal");
    for (let i = 0; i < reveals.length; i++
    ) {
      const windowHeight = window.innerHeight;
      const elementTop = reveals[i].getBoundingClientRect().top;
      let elementVisible = 10;

      if (elementTop < windowHeight - elementVisible) {
        reveals[i].classList.add("active");
      } else {
        reveals[i].classList.remove("active");
      }
    }
  }

}
