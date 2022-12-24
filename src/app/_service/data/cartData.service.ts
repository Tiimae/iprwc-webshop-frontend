import {Injectable} from "@angular/core";
import {BehaviorSubject, Subject} from "rxjs";
import {ProductModel} from "src/app/_models/product.model";
import { ProductDataService } from "./productData.service";
import {SupplierModel} from "../../_models/supplier.model";

@Injectable({
  providedIn: 'root',
})
export class CartDataService {
  products: ProductModel[] = [];
  products$: Subject<ProductModel[]> = new BehaviorSubject<ProductModel[]>([]);

  constructor(
    private productDataService: ProductDataService
  ) {
    if (localStorage.getItem("cart") !== null) {
      this.getAllProductsInCart()
    } else {
      localStorage.setItem("cart", JSON.stringify([]))
    }
  }

  private getAllProductsInCart(): void {
    let items = localStorage.getItem("cart");

    if (items == null) {
      return;
    }
    setTimeout(() => {
      if (items != null) {
        JSON.parse(items).forEach((item: any) => {
          this.productDataService
            .get(JSON.parse(item).id)
            .subscribe({
              next: (product: ProductModel | undefined): void => {
                if (product == undefined) {
                  return;
                }

                this.products.push(product)
              },
              error(e: Error) {
                console.log(e.message)
              },
              complete: () => {
              }
            })
        })
      }
      this.products$.next(this.products);
    }, 200)
  }

  createProduct(product: ProductModel, amount: number): void {
    let items = localStorage.getItem("cart");
    let check = false

    if (items == null) {
      items = JSON.stringify([]);
    }

    items = JSON.parse(items);

    if (items != null) {
      // @ts-ignore
      let item = items.find(item => JSON.parse(item).id === product.id)
      if (item != undefined) {
        const newItem = JSON.stringify({
          "id": product.id,
          "amount": JSON.parse(item).amount + amount
        });
        // @ts-ignore
        items[items.findIndex(item => JSON.parse(item).id === product.id)] = newItem
        check = true;
      } else {
        const newItem = JSON.stringify({
          "id": product.id,
          "amount": amount
        });

        // @ts-ignore
        items.push(newItem);

        this.products.push(product)
        this.products$.next(this.products)
      }
    }

    localStorage.setItem("cart", JSON.stringify(items))
  }

}