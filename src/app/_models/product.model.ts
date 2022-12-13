import {CategoryModel} from "./category.model";
import {BrandModel} from "./brand.model";
import { SupplierModel } from "./supplier.model";
import {ProductImageModel} from "./productImage.model";

export class ProductModel {
  private readonly _id: string;
  private readonly _productName: string;
  private readonly _description: string;
  private readonly _price: string;
  private readonly _category: CategoryModel;
  private readonly _brand: BrandModel;
  private readonly _supplier: SupplierModel;
  private readonly _productImages: ProductImageModel[];


  constructor(id: string, productName: string, description: string, price: string, category: CategoryModel, brand: BrandModel, supplier: SupplierModel, productImages: ProductImageModel[]) {
    this._id = id;
    this._productName = productName;
    this._description = description;
    this._price = price;
    this._category = category;
    this._brand = brand;
    this._supplier = supplier;
    this._productImages = productImages;
  }

  get id(): string {
    return this._id;
  }


  get productName(): string {
    return this._productName;
  }

  get description(): string {
    return this._description;
  }

  get price(): string {
    return this._price;
  }

  get category(): CategoryModel {
    return this._category;
  }

  get brand(): BrandModel {
    return this._brand;
  }

  get supplier(): SupplierModel {
    return this._supplier;
  }

  get productImages(): ProductImageModel[] {
    return this._productImages;
  }
}
