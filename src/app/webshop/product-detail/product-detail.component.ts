import {Component, OnInit} from '@angular/core';
import {ActivatedRoute} from '@angular/router';
import {faArrowLeft, faArrowRight, faCheck, faStar} from '@fortawesome/free-solid-svg-icons';
import {ToastrService} from 'ngx-toastr';
import {CartDataService} from 'src/app/_service/_data/cartData.service';
import {AppComponent} from '../../app.component';
import {ProductModel} from '../../_models/product.model';
import {ReviewModel} from '../../_models/review.model';
import {ApiConnectorService} from '../../_service/_api/api-connector.service';
import {ProductDataService} from '../../_service/_data/productData.service';
import {Title} from "@angular/platform-browser";

@Component({
  selector: 'app-product-detail',
  templateUrl: './product-detail.component.html',
  styleUrls: ['./product-detail.component.scss']
})
export class ProductDetailComponent implements OnInit {
  public productId!: string;
  public product!: ProductModel;
  public stars: number = 0;

  public imgId: number = 1;

  public faStar = faStar;
  public faCheck = faCheck;
  public faArrowRight = faArrowRight;
  public faArrowLeft = faArrowLeft;

  constructor(
    private route: ActivatedRoute,
    private productDataService: ProductDataService,
    private cartDataService: CartDataService,
    private toastr: ToastrService,
    private api: ApiConnectorService,
    private title: Title
  ) {}

  ngOnInit(): void {
    AppComponent.isLoading = true;
    this.route.params.subscribe(async (params) => {
      this.productId = params['productId']

      this.productDataService.get(this.productId).subscribe((res) => {
        if (res == undefined) {
          this.productDataService.getByRequest(this.productId).then((res) => {
            this.product = res.data.payload;
            this.calculateStars();
            this.title.setTitle(`F1 Webshop | Product Detail - ${this.product.productName}`)
          });
        } else {
          this.product = res;
          this.calculateStars();
        }
      });
    });

    AppComponent.isLoading = false;
  }

  private calculateStars(): void {
    let stars: number = 0;

    if (this.product.reviews.length === 0) {
      return;
    }

    this.product.reviews.forEach((review) => {
      stars += review.stars;
    });

    this.stars = Math.round((stars / this.product.reviews.length) * 10) / 10;
  }

  public slideImage(id: number): void {
    if (id < 1 || id > this.product.productImages.length) {
      return;
    }

    this.imgId = id;

    const displayWidth = document.querySelector(
      '.img-showcase img:first-child'
    );

    if (displayWidth == null) {
      return;
    }

    const width = displayWidth.clientWidth;

    // @ts-ignore
    document.querySelector('.img-showcase').style.transform = `translateX(${
      -(this.imgId - 1) * width
    }px)`;
  }

  public addToCart(): void {
    AppComponent.isLoading = true;
    const input = <HTMLInputElement>document.getElementById('amount');

    if (input != null && Number(input.value) > 1) {
      let newAmount = Number(input.value);

      const localStorageItem = this.cartDataService.getCartItem(
        this.product.id
      );
      if (localStorageItem != undefined) {
        newAmount =
          Number(JSON.parse(localStorageItem).amount) + Number(input.value);
      }

      this.cartDataService.createProduct(this.product, newAmount, true);
    } else {
      this.cartDataService.createProduct(this.product, 1, true);
    }
    this.toastr.success('Item added successfully to your Cart!', 'Added!');

    AppComponent.isLoading = false;
  }

  public addReviewToProduct(event: ReviewModel): void {
    AppComponent.isLoading = true;

    this.product.reviews.push(event);
    this.productDataService.setNewReview(this.productId, this.product);
    this.calculateStars();
    AppComponent.isLoading = false;
  }
}
