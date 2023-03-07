import { Injectable } from '@angular/core';
import { AxiosResponse } from 'axios';
import { ToastrService } from 'ngx-toastr';
import { BehaviorSubject, Subject } from 'rxjs';
import { ProductModel } from 'src/app/_models/product.model';
import { ProductDataService } from './productData.service';

@Injectable({
  providedIn: 'root'
})
export class CartDataService {
  private products: ProductModel[] = [];
  public products$: Subject<ProductModel[]> = new BehaviorSubject<
    ProductModel[]
  >([]);

  constructor(
    private productDataService: ProductDataService,
    private toastr: ToastrService
  ) {}

  public getAllProductsInCart(): void {
    let items = localStorage.getItem('cart');

    if (items == null) {
      return;
    }
    setTimeout(() => {
      if (items != null) {
        JSON.parse(items).forEach((item: any) => {
          this.productDataService.get(JSON.parse(item).id).subscribe({
            next: (product: ProductModel | undefined): void => {
              if (product == undefined) {
                this.productDataService
                  .getByRequest('product/' + JSON.parse(item).id)
                  .then((res: AxiosResponse) => {
                    this.products.push(res.data.payload);
                  });
              } else {
                this.products.push(product);
              }
            },
            error(e: Error) {
              console.log(e.message);
            },
            complete: () => {}
          });
        });
      }
      this.products$.next(this.products);
    }, 500);
  }

  public createProduct(product: ProductModel, amount: number): void {
    if (amount < 1) {
      this.toastr.error("Amount can't be lower then 1", 'Error');
      return;
    }

    let items = localStorage.getItem('cart');
    let check = false;

    if (items == null) {
      items = JSON.stringify([]);
    }

    items = JSON.parse(items);

    if (items != null) {
      // @ts-ignore
      let item = items.find((item) => JSON.parse(item).id === product.id);
      if (item != undefined) {
        let oldAmount: number = <number>JSON.parse(item).amount;
        oldAmount = amount;

        const newItem = JSON.stringify({
          id: product.id,
          amount: oldAmount
        });
        // @ts-ignore
        items[items.findIndex((item) => JSON.parse(item).id === product.id)] =
          newItem;
        check = true;
      } else {
        const newItem = JSON.stringify({
          id: product.id,
          amount: amount
        });

        // @ts-ignore
        items.push(newItem);

        this.products.push(product);
        this.products$.next(this.products);
      }
    }

    localStorage.setItem('cart', JSON.stringify(items));
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

  public removeProduct(product: ProductModel): void {
    this.products.forEach((currentProduct, index) => {
      if (currentProduct.id == product.id) {
        this.products.splice(index, 1);
      }
    });

    let items = localStorage.getItem('cart');
    let check = false;

    if (items == null) {
      return;
    }

    items = JSON.parse(items);

    if (items != null) {
      // @ts-ignore
      items.splice(
        // @ts-ignore
        items.findIndex((item) => JSON.parse(item).id === product.id),
        1
      );
    }

    localStorage.setItem('cart', JSON.stringify(items));

    this.products$.next(this.products);
  }

  public clearCart(): void {
    this.products = [];
    localStorage.setItem('cart', JSON.stringify([]));
    this.products$.next(this.products);
  }
}
