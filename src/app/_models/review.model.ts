export class ReviewModel {
  private readonly _id: string;
  private readonly _description: string;
  private readonly _stars: number;

  constructor(id: string, description: string, stars: number) {
    this._id = id;
    this._description = description;
    this._stars = stars;
  }


  get id(): string {
    return this._id;
  }

  get description(): string {
    return this._description;
  }

  get stars(): number {
    return this._stars;
  }
}
