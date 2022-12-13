import {ProductModel} from "./product.model";

export class ProductImageModel {
  private readonly _id: string;
  private readonly _image_path: string
  private readonly _product: ProductModel;

  constructor(id: string, image_path: string, product: ProductModel) {
    this._id = id;
    this._image_path = image_path;
    this._product = product;
  }


  get id(): string {
    return this._id;
  }

  get image_path(): string {
    return this._image_path;
  }

  get product(): ProductModel {
    return this._product;
  }
}
