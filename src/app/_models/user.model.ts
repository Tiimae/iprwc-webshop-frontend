import {RoleModel} from './role.model';
import {UserAddressesModel} from './userAddresses.model';
import {OrderModel} from './order.model';

export class UserModel {
  private readonly _id: string;
  private readonly _firstName: string;
  private readonly _middleName: string;
  private readonly _lastName: string;
  private readonly _email: string;
  private readonly _roles: RoleModel[] = [];
  private readonly _addresses: UserAddressesModel[] = [];
  private readonly _orders: OrderModel[] = [];

  constructor(
    id: string,
    firstName: string,
    middleName: string,
    lastName: string,
    email: string,
    roles: RoleModel[],
    addresses: UserAddressesModel[],
    orders: OrderModel[]
  ) {
    this._id = id;
    this._firstName = firstName;
    this._middleName = middleName;
    this._lastName = lastName;
    this._email = email;
    this._roles = roles;
    this._addresses = addresses;
    this._orders = orders;
  }

  get id(): string {
    return this._id;
  }

  get firstName(): string {
    return this._firstName;
  }

  get middleName(): string {
    return this._middleName;
  }

  get lastName(): string {
    return this._lastName;
  }

  get email(): string {
    return this._email;
  }

  get roles(): RoleModel[] {
    return this._roles;
  }

  get addresses(): UserAddressesModel[] {
    return this._addresses;
  }

  get orders(): OrderModel[] {
    return this._orders;
  }
}
