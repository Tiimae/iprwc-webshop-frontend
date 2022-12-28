import {UserModel} from "./user.model";

export class UserAddressesModel {
  private readonly _id: string;
  private readonly _street: string;
  private readonly _houseNumber: number;
  private readonly _addition: string;
  private readonly _zipcode: string;
  private readonly _city: string;
  private readonly _country: string;
  private readonly _type: string;
  private readonly _user: UserModel;


  constructor(id: string, street: string, houseNumber: number, addition: string, zipcode: string, city: string, country: string, type: string, user: UserModel) {
    this._id = id;
    this._street = street;
    this._houseNumber = houseNumber;
    this._addition = addition;
    this._zipcode = zipcode;
    this._city = city;
    this._country = country;
    this._type = type;
    this._user = user;
  }

  get id(): string {
    return this._id;
  }

  get street(): string {
    return this._street;
  }

  get houseNumber(): number {
    return this._houseNumber;
  }

  get addition(): string {
    return this._addition;
  }

  get zipcode(): string {
    return this._zipcode;
  }

  get city(): string {
    return this._city;
  }

  get country(): string {
    return this._country;
  }

  get type(): string {
    return this._type;
  }

  get user(): UserModel {
    return this._user;
  }
}
