import {Injectable} from "@angular/core";
import {BrandModel} from "src/app/_models/brand.model";
import {ApiMethodsService} from "../api-methods.service";
import {BehaviorSubject, Observable, of, Subject} from "rxjs";
import {v4 as uuid} from "uuid";
import {ToastrService} from "ngx-toastr";

@Injectable({
  providedIn: 'root',
})
export class BrandDataService {
  brands: BrandModel[] = []
  brands$: Subject<BrandModel[]> = new BehaviorSubject<BrandModel[]>([]);

  constructor(
    private apiMethod: ApiMethodsService,
    private toastr: ToastrService
  ) {
    this.getAll()
  }

  public async get(brandId: string): Promise<Observable<BrandModel>> {
    return await ApiMethodsService.getInstance().get('brand/' + brandId, true).then(r => {
      return of(r.data.payload)
    });
  }

  public async getAll(): Promise<void> {
    await ApiMethodsService.getInstance().get('brand', true).then(r => {
      this.brands = r.data.payload
      this.brands$.next(this.brands)
    });
  }

  public create(brand: BrandModel): boolean {
    let check = true

    this.brands.forEach((currentBrand: BrandModel) => {
      if (brand.brandName === currentBrand.brandName) {
        this.toastr.error('Brand name is already in user.', 'Failed');
        check = false;
      }
    })

    if (!check) {
      return check;
    }

    const formData = new FormData();
    const extension =  brand.image.type.split("/")[1]
    formData.append('logo', brand.logoUrl, uuid() + "." + extension)
    formData.append("brand", JSON.stringify({
      "brandName": brand.brandName,
      "webPage": brand.webPage,
      "logo": "",
      "productIds": []
    }))

    ApiMethodsService.getInstance().post("brand", formData, true).then(r => {
      this.brands.push(r.data.payload);
      this.brands$.next(this.brands)
    })

    return check;
  }

  public update(brand: BrandModel): boolean {
    let check = true

    this.brands.forEach((currentBrand: BrandModel) => {
      if (brand.brandName === currentBrand.brandName) {
        this.toastr.error('Brand name is already in user.', 'Failed');
        check = false;
      }
    })

    if (!check) {
      return check;
    }

    const formData = new FormData();
    if (brand.image != null) {
      formData.append('logo', brand.image, brand.image.name)
    }
    formData.append("brand", JSON.stringify({
      "brandName": brand.brandName,
      "webPage": brand.webPage,
      "logo": "",
      "productIds": []
    }))

    ApiMethodsService.getInstance().put("brand/" + brand.id, formData, true).then(r => {
      this.brands[this.brands.findIndex(currentBrand => currentBrand.id === r.data.payload.id)] = r.data.payload
      this.brands$.next(this.brands)
    })

    return check;
  }

  public remove(brand: BrandModel) {
    this.brands.forEach((currentUser, index) => {
      if (currentUser.id == brand.id) {
        this.brands.splice(index, 1)
      }
    })

    ApiMethodsService.getInstance().delete("brand/" + brand.id, true).then(r => {
      this.brands$.next(this.brands)
    })
  }
}
