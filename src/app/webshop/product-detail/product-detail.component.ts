import { Component, OnInit } from '@angular/core';
import * as CryptoJs from "crypto-js";
import {ApiConnectorService} from "../../_service/api-connector.service";
import {ActivatedRoute, Router} from "@angular/router";
import {ProductDataService} from "../../_service/data/productData.service";
import {ProductModel} from "../../_models/product.model";
import {faStar, faCheck} from "@fortawesome/free-solid-svg-icons";
import { CartDataService } from 'src/app/_service/data/cartData.service';
import {ToastrService} from "ngx-toastr";
// import {faInstagram} from "@fortawesome/fontawesome-svg-core"

@Component({
  selector: 'app-product-detail',
  templateUrl: './product-detail.component.html',
  styleUrls: ['./product-detail.component.scss']
})
export class ProductDetailComponent implements OnInit {

  productId!: string;
  product!: ProductModel

  imgId: number = 1

  faStar = faStar
  faCheck = faCheck

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private productDataService: ProductDataService,
    private cartDataService: CartDataService,
    private toastr: ToastrService,
    private api: ApiConnectorService
  ) { }

  ngOnInit(): void {
    this.route.params.subscribe(async (params) => {
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
        })
    })
  }

  slideImage(id: number): void {
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
  }
}
