import {CategoryModel} from './category.model';
import {BrandModel} from './brand.model';
import {SupplierModel} from './supplier.model';
import {ProductImageModel} from './productImage.model';
import {OrderProductModel} from './orderProduct.model';
import {ReviewModel} from './review.model';

export class ProductModel {
  private readonly _id: string;
  private readonly _productName: string;
  private readonly _description: string;
  private readonly _price: number;
  private readonly _category: CategoryModel;
  private readonly _brand: BrandModel;
  private readonly _supplier: SupplierModel;
  private readonly _productImages: ProductImageModel[];
  private readonly _ordersProducts: OrderProductModel[] = [];
  private readonly _reviews: ReviewModel[] = [];
  private readonly _deleted: boolean;

  constructor(
    id: string,
    productName: string,
    description: string,
    price: number,
    category: CategoryModel,
    brand: BrandModel,
    supplier: SupplierModel,
    productImages: ProductImageModel[],
    ordersProducts: OrderProductModel[],
    reviews: ReviewModel[],
    deleted: boolean
  ) {
    this._id = id;
    this._productName = productName;
    this._description = description;
    this._price = price;
    this._category = category;
    this._brand = brand;
    this._supplier = supplier;
    this._productImages = productImages;
    this._ordersProducts = ordersProducts;
    this._reviews = reviews;
    this._deleted = deleted;
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

  get price(): number {
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

  get ordersProducts(): OrderProductModel[] {
    return this._ordersProducts;
  }

  get deleted(): boolean {
    return this._deleted;
  }

  get reviews(): ReviewModel[] {
    return this._reviews;
  }
}
