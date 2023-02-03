import { Injectable } from '@angular/core';
import { AxiosResponse } from 'axios';
import { ToastrService } from 'ngx-toastr';
import { BehaviorSubject, Observable, of, Subject } from 'rxjs';
import { v4 as uuid } from 'uuid';
import { ProductModel } from '../../_models/product.model';
import { ProductImageModel } from '../../_models/productImage.model';
import { ApiMethodsService } from '../api-methods.service';

@Injectable({
  providedIn: 'root'
})
export class ProductDataService {
  private products: ProductModel[] = [];
  public products$: Subject<ProductModel[]> = new BehaviorSubject<
    ProductModel[]
  >([]);
  private deletedProducts: ProductModel[] = [];
  public deletedProducts$: Subject<ProductModel[]> = new BehaviorSubject<
    ProductModel[]
  >([]);

  constructor(private toastr: ToastrService, private api: ApiMethodsService) {}

  public get(productId: string): Observable<ProductModel | undefined> {
    if (this.products.length != 0) {
      return of(
        <ProductModel>(
          this.products.find((products) => products.id === productId)
        )
      );
    }

    return of(undefined);
  }

  public getByRequest(productId: string): Promise<AxiosResponse> {
    return this.api.get('product/' + productId, false);
  }

  public getAll(): void {
    this.api.get('product', false).then((res: AxiosResponse) => {
      res.data.payload.forEach((product: ProductModel) => {
        if (product.deleted) {
          this.deletedProducts.push(product);
        } else {
          this.products.push(product);
        }
      });

      this.products$.next(this.products);
      this.deletedProducts$.next(this.deletedProducts);
    });
  }

  public post(product: ProductModel, images: File[]): boolean {
    let check = true;

    this.products.forEach((currentProduct: ProductModel) => {
      if (product.productName === currentProduct.productName) {
        this.toastr.error('Product name is already in products.', 'Failed');
        check = false;
      }
    });

    if (!check) {
      return check;
    }

    const fd = new FormData();
    images.forEach((image) => {
      const extension = image.type.split('/')[1];
      fd.append('images', image, uuid() + '.' + extension);
    });
    fd.append(
      'product',
      JSON.stringify({
        productName: product.productName,
        description: product.description,
        price: product.price,
        brandId: product.brand.id,
        categoryId: product.category.id,
        supplierId: product.supplier.id
      })
    );

    this.api.post('product', fd, true).then((res: AxiosResponse) => {
      this.products.push(res.data.payload);
      this.products$.next(this.products);
    });

    return check;
  }

  public update(
    product: ProductModel,
    deletedImages: ProductImageModel[],
    newImages: File[]
  ): boolean {
    let check = true;

    this.products.forEach((currentProduct: ProductModel) => {
      if (
        product.productName === currentProduct.productName &&
        product.id !== currentProduct.id
      ) {
        this.toastr.error('Product name is already in products.', 'Failed');
        check = false;
      }
    });

    if (!check) {
      return check;
    }

    const fd = new FormData();
    deletedImages.forEach((image) => {
      fd.append('deletedImages', image.imagePath);
    });
    newImages.forEach((image) => {
      const extension = image.type.split('/')[1];
      fd.append('newImages', image, uuid() + '.' + extension);
    });
    fd.append(
      'product',
      JSON.stringify({
        productName: product.productName,
        description: product.description,
        price: product.price,
        brandId: product.brand.id,
        categoryId: product.category.id,
        supplierId: product.supplier.id
      })
    );

    this.api
      .put('product/' + product.id, fd, true)
      .then((res: AxiosResponse) => {
        this.products[
          this.products.findIndex(
            (currentProduct) => currentProduct.id === product.id
          )
        ] = res.data.payload;
        this.products$.next(this.products);
      });

    return check;
  }

  public delete(productId: string): void {
    this.api.delete('product/' + productId, true).then((r: AxiosResponse) => {
      this.products.splice(
        this.products.findIndex(
          (currentProduct) => currentProduct.id === productId
        ),
        1
      );
      this.deletedProducts.push(r.data.payload);
      this.products$.next(this.products);
      this.deletedProducts$.next(this.products);
    });
  }

  restore(productId: string): void {
    this.api
      .delete('product/' + productId + '/restore', true)
      .then((r: AxiosResponse) => {
        this.deletedProducts.splice(
          this.deletedProducts.findIndex(
            (currentProduct) => currentProduct.id === productId
          ),
          1
        );
        this.products.push(r.data.payload);

        this.products$.next(this.products);
        this.deletedProducts$.next(this.deletedProducts);
      });
  }

  setNewReview(productId: string, product: ProductModel) {
    this.products[
      this.products.findIndex(
        (currentProduct) => currentProduct.id === product.id
      )
    ] = product;
    this.products$.next(this.products);
  }
}
