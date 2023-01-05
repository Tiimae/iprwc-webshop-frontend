export class BrandModel {
  private _id: string;
  private _brandName: string;
  private _webPage: string;
  private _logoUrl: File | string;
  private _image: File | undefined;

  constructor(id: string, brandName: string, webPage: string, logoUrl: File | string) {
    this._id = id;
    this._brandName = brandName;
    this._webPage = webPage;
    this._logoUrl = logoUrl;
  }


  get id(): string {
    return this._id;
  }

  set id(value: string) {
    this._id = value;
  }

  get brandName(): string {
    return this._brandName;
  }

  set brandName(value: string) {
    this._brandName = value;
  }

  get webPage(): string {
    return this._webPage;
  }

  set webPage(value: string) {
    this._webPage = value;
  }


  get logoUrl(): File | string {
    return this._logoUrl;
  }

  set logoUrl(value: File | string) {
    this._logoUrl = value;
  }

  get image(): File {
    return <File>this._image;
  }

  set image(value: File) {
    this._image = value;
  }
}
