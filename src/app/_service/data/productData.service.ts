import {Injectable} from "@angular/core";
import {ProductModel} from "../../_models/product.model";
import {BehaviorSubject, Observable, of, Subject} from "rxjs";
import {ApiMethodsService} from "../api-methods.service";
import { v4 as uuid } from 'uuid';
import {ProductImageModel} from "../../_models/productImage.model";

@Injectable({
  providedIn: 'root',
})
export class ProductDataService {
  private products: ProductModel[] = [];
  products$: Subject<ProductModel[]> = new BehaviorSubject<ProductModel[]>([]);

  constructor() {
    this.getAll();
  }

  get(productId: string): Observable<ProductModel | undefined> {
    if (this.products.length != 0) {
      return of(<ProductModel>this.products.find(products => products.id === productId));
    }

    return of(undefined);
  }

  getAll(): void {
    ApiMethodsService.getInstance().get("product", true).then(res => {
      this.products = res.data.payload;
      this.products$.next(this.products);
    })
  }

  post(product: ProductModel, images: File[]): void {
    const fd = new FormData()
    images.forEach(image => {
      const extension =  image.type.split("/")[1]
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

  }

  update(product: ProductModel, deletedImages: ProductImageModel[], newImages: File[]): void {
    const fd = new FormData()
    deletedImages.forEach(image => {
      fd.append("deletedImages", image.imagePath)
    })
    newImages.forEach(image => {
      const extension =  image.type.split("/")[1]
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
  }

  delete(productId: string): void {
    this.products.forEach((currentProduct, index) => {
      if (currentProduct.id == productId) {
        this.products.splice(index, 1)
      }
    })

    ApiMethodsService.getInstance().delete("product/" + productId, true).then(r => {
      this.products$.next(this.products);
    })
  }
}
