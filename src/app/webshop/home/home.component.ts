import { Component, HostListener, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { AppComponent } from '../../app.component';
import { CategoryModel } from '../../_models/category.model';
import { ProductModel } from '../../_models/product.model';
import { AuthService } from '../../_service/auth.service';
import { ApiConnectorService } from '../../_service/_api/api-connector.service';
import { CategoryDataService } from '../../_service/_data/categoryData.service';
import { ProductDataService } from '../../_service/_data/productData.service';
import {Title} from "@angular/platform-browser";

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {
  public isLoading: boolean = false;
  public products: ProductModel[] = [];
  public categories: CategoryModel[] = [];

  public productsToShow: ProductModel[] = [];
  public uri: boolean = false;

  private productsCheck: boolean = false;

  constructor(
    private productDataService: ProductDataService,
    private categoryService: CategoryDataService,
    private authService: AuthService,
    private api: ApiConnectorService,
    private route: ActivatedRoute,
    private title: Title
  ) {}

  async ngOnInit(): Promise<void> {
    AppComponent.isLoading = true;
    this.title.setTitle("F1 Webshop | Home")
    const jwtToken = localStorage.getItem('blank-token');

    try {
      if (jwtToken !== null) {
        const secret = await this.authService.getSecret();

        setTimeout(() => {
          localStorage.clear();

          this.api.storeJwtToken(jwtToken ?? '', secret.data['message']);

          location.reload();
        }, 500);
      }
    } catch (error) {
      localStorage.clear();
    }

    this.productDataService.products$.subscribe({
      next: (products: ProductModel[]) => {
        if (products.length == 0 && this.productsCheck == false) {
          this.productDataService.getAll();
          this.productsCheck = true;
        }

        this.products = products;
        this.productsToShow = this.products;
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
        console.log('complete');
      }
    });

    this.categoryService.getAllCategories();
    this.categoryService.categories$.subscribe({
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

        this.reveal(null);
      },
      error(e: Error) {
        throw new Error(e.message);
      },
      complete: () => {
        console.log('complete');
      }
    });

    this.route.url.subscribe((res) => {
      if (res[0] != undefined) {
        this.uri = true;
      }
    });

    this.route.queryParams.subscribe((params) => {
      if (params['search'] != null) {
        this.productsToShow = [];
        this.products.forEach((product) => {
          if (
            product.productName
              .toLowerCase()
              .includes(params['search'].toLowerCase()) ||
            product.category.categoryName
              .toLowerCase()
              .includes(params['search'].toLowerCase())
          ) {
            this.productsToShow.push(product);
          }
        });
      }
    });

    setTimeout(() => {
      this.reveal(null);
      AppComponent.isLoading = false;
    }, 1000);
  }

  public showProducts(category: string): void {
    this.productsToShow = [];

    if (category === 'all') {
      this.productsToShow = this.products;
      setTimeout(() => {
        this.reveal(null);
      }, 200);
      return;
    }

    this.products.forEach((product) => {
      if (product.category.categoryName === category) {
        this.productsToShow.push(product);
      }
    });

    setTimeout(() => {
      this.reveal(null);
    }, 200);
  }

  @HostListener('window:scroll', ['$event'])
  public reveal(event: any): void {
    const reveals = document.querySelectorAll('.reveal');
    for (let i = 0; i < reveals.length; i++) {
      const windowHeight = window.innerHeight;
      const elementTop = reveals[i].getBoundingClientRect().top;
      let elementVisible = 10;

      if (elementTop < windowHeight - elementVisible) {
        reveals[i].classList.add('active');
      } else {
        reveals[i].classList.remove('active');
      }
    }
  }
}
