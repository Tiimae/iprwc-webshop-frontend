import {UserModel} from "./user.model";
import {OrderProductModel} from "./orderProduct.model";
import {UserAddressesModel} from "./userAddresses.model";

export class OrderModel {
  private readonly _id: string;
  private readonly _orderId: string;
  private readonly _orderDate: Date;
  private readonly _user: UserModel;
  private readonly _orderProducts: OrderProductModel[];
  private readonly _userAddresses: UserAddressesModel[];

  constructor(id: string, orderId: string, orderDate: Date, user: UserModel, orderProducts: OrderProductModel[], userAddresses: UserAddressesModel[]) {
    this._id = id;
    this._orderId = orderId;
    this._orderDate = orderDate;
    this._user = user;
    this._orderProducts = orderProducts;
    this._userAddresses = userAddresses;
  }


  get id(): string {
    return this._id;
  }

  get orderId(): string {
    return this._orderId;
  }

  get orderDate(): Date {
    return this._orderDate;
  }

  get user(): UserModel {
    return this._user;
  }

  get orderProducts(): OrderProductModel[] {
    return this._orderProducts;
  }

  get userAddresses(): UserAddressesModel[] {
    return this._userAddresses;
  }
}
