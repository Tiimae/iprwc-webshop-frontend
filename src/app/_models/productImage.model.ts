import { ProductModel } from './product.model';

export class ProductImageModel {
  private readonly _id: string;
  private readonly _imagePath: string;
  private readonly _product: ProductModel;

  constructor(id: string, imagePath: string, product: ProductModel) {
    this._id = id;
    this._imagePath = imagePath;
    this._product = product;
  }

  get id(): string {
    return this._id;
  }

  get imagePath(): string {
    return this._imagePath;
  }

  get product(): ProductModel {
    return this._product;
  }
}
