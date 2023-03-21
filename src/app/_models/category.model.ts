export class CategoryModel {
  private _id: string;
  private _categoryName: string;

  constructor(id: string, categoryName: string) {
    this._id = id;
    this._categoryName = categoryName;
  }

  get id(): string {
    return this._id;
  }

  get categoryName(): string {
    return this._categoryName;
  }
}
