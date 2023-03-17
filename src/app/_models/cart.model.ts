import {ProductModel} from "./product.model";

export class Cart {
  private _product: ProductModel;
  private _quantity: string;

  constructor(product: ProductModel, quantity: string) {
    this._product = product;
    this._quantity = quantity;
  }


  get product(): ProductModel {
    return this._product;
  }

  get quantity(): string {
    return this._quantity;
  }


  set quantity(value: string) {
    this._quantity = value;
  }
}
