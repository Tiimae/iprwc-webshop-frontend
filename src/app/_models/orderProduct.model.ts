import {OrderModel} from './order.model';
import {ProductModel} from './product.model';

export class OrderProductModel {
  private readonly _id: string;
  private readonly _amount: number;
  private readonly _status: string;
  private readonly _order: OrderModel;
  private readonly _product: ProductModel;

  constructor(
    id: string,
    amount: number,
    status: string,
    order: OrderModel,
    product: ProductModel
  ) {
    this._id = id;
    this._amount = amount;
    this._status = status;
    this._order = order;
    this._product = product;
  }

  get id(): string {
    return this._id;
  }

  get amount(): number {
    return this._amount;
  }

  get status(): string {
    return this._status;
  }

  get order(): OrderModel {
    return this._order;
  }

  get product(): ProductModel {
    return this._product;
  }
}
