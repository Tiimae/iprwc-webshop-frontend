export class SupplierModel {
  private readonly _id: string;
  private readonly _name: string;
  private readonly _address: string;
  private readonly _zipcode: string;
  private readonly _city: string;
  private readonly _country: string;


  constructor(id: string, name: string, address: string, zipcode: string, city: string, country: string) {
    this._id = id;
    this._name = name;
    this._address = address;
    this._zipcode = zipcode;
    this._city = city;
    this._country = country;
  }


  get id(): string {
    return this._id;
  }

  get name(): string {
    return this._name;
  }

  get address(): string {
    return this._address;
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
}
