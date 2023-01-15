import {Injectable} from "@angular/core";
import {ProductModel} from "../../_models/product.model";
import {BehaviorSubject, Observable, of, Subject} from "rxjs";
import {ApiMethodsService} from "../api-methods.service";
import {v4 as uuid} from 'uuid';
import {ProductImageModel} from "../../_models/productImage.model";
import {CategoryModel} from "../../_models/category.model";
import {ToastrService} from "ngx-toastr";

@Injectable({
  providedIn: 'root',
})
export class ProductDataService {
  private products: ProductModel[] = [];
  products$: Subject<ProductModel[]> = new BehaviorSubject<ProductModel[]>([]);
  private deletedProducts: ProductModel[] = [];
  deletedProducts$: Subject<ProductModel[]> = new BehaviorSubject<ProductModel[]>([]);

  constructor(
    private toastr: ToastrService
  ) {
    this.getAll();
  }

  get(productId: string): Observable<ProductModel | undefined> {
    if (this.products.length != 0) {
      return of(<ProductModel>this.products.find(products => products.id === productId));
    }

    return of(undefined);
  }

  getAll(): void {
    ApiMethodsService.getInstance().get("product", false).then(res => {
      res.data.payload.forEach((product: ProductModel) => {
        if (product.deleted) {
          this.deletedProducts.push(product)
        } else {
          this.products.push(product)
        }
      })

      this.products$.next(this.products);
      this.deletedProducts$.next(this.deletedProducts);
    })
  }

  post(product: ProductModel, images: File[]): boolean {
    let check = true

    this.products.forEach((currentProduct: ProductModel) => {
      if (product.productName === currentProduct.productName) {
        this.toastr.error('Product name is already in products.', 'Failed');
        check = false;
      }
    })

    if (!check) {
      return check;
    }

    const fd = new FormData()
    images.forEach(image => {
      const extension = image.type.split("/")[1]
      fd.append("images", image, uuid() + "." + extension)
    })
    fd.append("product", JSON.stringify({
        "productName": product.productName,
        "description": product.description,
        "price": product.price,
        "brandId": product.brand.id,
        "categoryId": product.category.id,
        "supplierId": product.supplier.id
      })
    )

    ApiMethodsService.getInstance().post("product", fd, true).then(res => {
      this.products.push(res.data.payload)
      this.products$.next(this.products)
    })

    return check;

  }

  update(product: ProductModel, deletedImages: ProductImageModel[], newImages: File[]): boolean {
    let check = true

    this.products.forEach((currentProduct: ProductModel) => {
      if (product.productName === currentProduct.productName && product.id !== currentProduct.id) {
        this.toastr.error('Product name is already in products.', 'Failed');
        check = false;
      }
    })

    if (!check) {
      return check;
    }

    const fd = new FormData()
    deletedImages.forEach(image => {
      fd.append("deletedImages", image.imagePath)
    })
    newImages.forEach(image => {
      const extension = image.type.split("/")[1]
      fd.append("newImages", image, uuid() + "." + extension)
    })
    fd.append("product", JSON.stringify({
        "productName": product.productName,
        "description": product.description,
        "price": product.price,
        "brandId": product.brand.id,
        "categoryId": product.category.id,
        "supplierId": product.supplier.id
      })
    )

    ApiMethodsService.getInstance().put("product/" + product.id, fd, true).then(res => {
      this.products[this.products.findIndex(currentProduct => currentProduct.id === product.id)] = res.data.payload
      this.products$.next(this.products)
    })

    return check;
  }

  delete(productId: string): void {
    ApiMethodsService.getInstance().delete("product/" + productId, true).then(r => {
      this.products.splice(this.products.findIndex(currentProduct => currentProduct.id === productId), 1)
      this.deletedProducts.push(r.data.payload)
      this.products$.next(this.products);
      this.deletedProducts$.next(this.products);
    })
  }

  restore(productId: string): void {
    ApiMethodsService.getInstance().delete("product/" + productId + "/restore", true).then(r => {
      this.deletedProducts.splice(this.deletedProducts.findIndex(currentProduct => currentProduct.id === productId), 1)
      this.products.push(r.data.payload)

      this.products$.next(this.products);
      this.deletedProducts$.next(this.deletedProducts);
    })
  }

  setNewReview(productId: string, product: ProductModel) {
    this.products[this.products.findIndex(currentProduct => currentProduct.id === product.id)] = product;
    this.products$.next(this.products);
  }
}
