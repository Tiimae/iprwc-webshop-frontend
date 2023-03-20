import {Injectable} from '@angular/core';
import {ToastrService} from 'ngx-toastr';
import {BehaviorSubject, Subject} from 'rxjs';
import {ProductModel} from 'src/app/_models/product.model';
import {ProductDataService} from './productData.service';
import {ApiConnectorService} from "../_api/api-connector.service";
import {ApiMethodsService} from "../_api/api-methods.service";
import {Router} from "@angular/router";
import {Cart} from "../../_models/cart.model";

@Injectable({
  providedIn: 'root'
})
export class CartDataService {
  private products: Cart[] = [];
  public products$: Subject<Cart[]> = new BehaviorSubject<
    Cart[]
  >([]);

  constructor(
    private productDataService: ProductDataService,
    private toastr: ToastrService,
    private api: ApiConnectorService,
    private method: ApiMethodsService,
    private router: Router,
  ) {
    this.getAllProductsInCart();
  }

  public async getAllProductsInCart(): Promise<void> {
    if (await this.api.authenticated() && this.products.length < 1) {
      this.api.getJwtPayload().then(async res => {
        await this.method.get(`cart/${res.userId}`, true).then(async res => {
          for (const product of res.data.payload) {
            const index: number = this.products.findIndex(currentProduct => currentProduct.product.id === product.productId)

            if (index == -1) {
              await this.productDataService.getByRequest(product.productId).then(newProduct => {
                this.products.push(new Cart(newProduct.data.payload, product.quantity))
              })
            }
          }
          this.products$.next(this.products);
        })
      })

    }
  }

  public async createProduct(product: ProductModel, amount: number, details: boolean): Promise<void> {
    if (await this.api.authenticated()) {
      this.api.getJwtPayload().then(jwt => {
        this.api.auth().then(res => {
          res.post("cart", {
            "quantity": amount,
            "productId": product.id,
            "userId": jwt.userId
          }, {
            params: {detail: details}
          }).then(newRes => {
            const index: number = this.products.findIndex(currentProduct => currentProduct.product.id === product.id)

            if (index == -1) {
              this.products.push(new Cart(product, String(amount)));
            } else {
              if (details) {
                this.products[index].quantity = String(amount + Number(this.products[index].quantity))
              } else {

                this.products[index].quantity = String(amount)
              }
            }
            this.products$.next(this.products)
          })
        })
      })
    } else {
      this.router.navigate(['auth', 'login'], {
        queryParams: {
          redirectURI: `product/${product.id}`
        }
      })
    }
  }

  public getCartItem(productId: string) {
    let items = localStorage.getItem('cart');
    let check = false;

    if (items == null) {
      return;
    }

    items = JSON.parse(items);

    if (items != null) {
      // @ts-ignore
      let item = items.find((item) => JSON.parse(item).id === productId);

      if (item != undefined) {
        return item;
      }
    }
  }

  public async removeProduct(product: ProductModel): Promise<void> {

    if (await this.api.authenticated()) {
      this.api.getJwtPayload().then(res => {
        this.method.delete(`cart/${res.userId}/${product.id}`, true).then(res => {
          const index: number = this.products.findIndex(currentProduct => currentProduct.product.id === product.id);
          this.products.slice(index, 1);
        })
      })

      this.products$.next(this.products);
    } else {
      this.router.navigate(['auth', 'login'], {
        queryParams: {
          redirectURI: `product/${product.id}`
        }
      })
    }
  }

  public async clearCart() {
    if (await this.api.authenticated()) {
      this.api.getJwtPayload().then(res => {
        this.method.delete(`cart/${res.userId}`, true).then(res => {
          this.clearCartAfterLogout();
        })
      })
    } else {
      this.router.navigate(['auth', 'login']);
    }
  }

  public clearCartAfterLogout(): void {
    this.products = [];
    this.products$.next(this.products);
  }
}
