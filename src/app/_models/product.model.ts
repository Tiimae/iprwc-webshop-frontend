export class ProductModel {
  private _name: string = '';
  private _price: string = '';


  get name(): string {
    return this._name;
  }

  set name(value: string) {
    this._name = value;
  }

  get price(): string {
    return this._price;
  }

  set price(value: string) {
    this._price = value;
  }
}
