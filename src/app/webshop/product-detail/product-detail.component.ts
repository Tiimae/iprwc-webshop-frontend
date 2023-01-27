import { Component, OnInit } from '@angular/core';
import * as CryptoJs from "crypto-js";
import {ApiConnectorService} from "../../_service/api-connector.service";
import {ActivatedRoute, Router} from "@angular/router";
import {ProductDataService} from "../../_service/data/productData.service";
import {ProductModel} from "../../_models/product.model";
import {faStar, faCheck, faArrowRight, faArrowLeft} from "@fortawesome/free-solid-svg-icons";
import { CartDataService } from 'src/app/_service/data/cartData.service';
import {ToastrService} from "ngx-toastr";
import {ReviewModel} from "../../_models/review.model";
import {AppComponent} from "../../app.component";
// import {faInstagram} from "@fortawesome/fontawesome-svg-core"

@Component({
  selector: 'app-product-detail',
  templateUrl: './product-detail.component.html',
  styleUrls: ['./product-detail.component.scss']
})
export class ProductDetailComponent implements OnInit {

  isLoading: boolean = false;
  productId!: string;
  product!: ProductModel
  stars: number = 0;

  imgId: number = 1

  faStar = faStar
  faCheck = faCheck
  faArrowRight = faArrowRight
  faArrowLeft = faArrowLeft

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private productDataService: ProductDataService,
    private cartDataService: CartDataService,
    private toastr: ToastrService,
    private api: ApiConnectorService
  ) { }

  async ngOnInit(): Promise<void> {
    AppComponent.isLoading = true;
    await this.route.params.subscribe(async (params) => {
      const currentProductId = params['productId'].replaceAll("*", "/");
      this.productId = CryptoJs.Rabbit.decrypt(currentProductId, await this.api.getDecryptKey()).toString(CryptoJs.enc.Utf8)

      this.productDataService
        .get(this.productId)
        .subscribe(res => {
          if (res == undefined) {
            this.router.navigate([""])
            return;
          }

          this.product = res;

          this.calculateStars();
        })
    })

    AppComponent.isLoading = false;
  }

  calculateStars(): void {
    let stars: number = 0;

    if (this.product.reviews.length === 0) {
      return;
    }

    this.product.reviews.forEach(review => {
      stars += review.stars;
    })

    this.stars = Math.round(stars / this.product.reviews.length * 10) / 10;
  }

  slideImage(id: number): void {
    if (id < 1 || id > this.product.productImages.length) {
      return;
    }

    this.imgId = id;

    const displayWidth = document.querySelector('.img-showcase img:first-child');

    if (displayWidth == null) {
      return;
    }

    const width = displayWidth.clientWidth;

    // @ts-ignore
    document.querySelector('.img-showcase').style.transform = `translateX(${- (this.imgId - 1) * width}px)`;
  }

  addToCart() {
    AppComponent.isLoading = true;
    const input = (<HTMLInputElement>document.getElementById("amount"))

    if (input != null) {
      let newAmount = Number(input.value)

      const localStorageItem = this.cartDataService.getCartItem(this.product.id);
      if (localStorageItem != undefined) {
        newAmount = Number(JSON.parse(localStorageItem).amount) + Number(input.value)
      }

      this.cartDataService.createProduct(this.product, newAmount)
    } else {
      this.cartDataService.createProduct(this.product, 1)
    }
    this.toastr.success("Item added successfully to your Cart!", "Added!")

    AppComponent.isLoading = false;
  }

  addReviewToProduct(event: ReviewModel): void {
    AppComponent.isLoading = true;

    this.product.reviews.push(event);
    this.productDataService.setNewReview(this.productId, this.product);
    this.calculateStars();


    AppComponent.isLoading = false;
  }
}
