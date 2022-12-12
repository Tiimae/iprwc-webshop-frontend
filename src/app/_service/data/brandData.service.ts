import {Injectable} from "@angular/core";
import { BrandModel } from "src/app/_models/brand.model";
import {ApiMethodsService} from "../api-methods.service";
import {Observable, of} from "rxjs";

@Injectable({
  providedIn: 'root',
})
export class BrandDataService {
  brands: BrandModel[] = []

  constructor(
    private apiMethod: ApiMethodsService
  ) {
  }

  public async get(brandId: string): Promise<Observable<BrandModel>> {
    return await ApiMethodsService.getInstance().get('brand/' + brandId, true).then(r => {
      return of(r.data.payload)
    });
  }

  public async getAll(): Promise<Observable<BrandModel[]>> {
    return await ApiMethodsService.getInstance().get('brand', true).then(r => {
      this.brands = r.data.payload
      return of(this.brands);
    });
  }

  public create(brand: BrandModel) {
    const formData = new FormData();
    formData.append('logo', brand.logoUrl, brand.image.name)
    formData.append("brand", JSON.stringify({
      "brandName": brand.brandName,
      "webPage": brand.webPage,
      "logo": "",
      "productIds": []
    }))

    ApiMethodsService.getInstance().post("brand", formData, true).then(r => {
      this.brands.push(r.data.payload);
    })
  }

  public update(brand: BrandModel): void {
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
    })
  }

  public remove(brand: BrandModel) {
    this.brands.forEach((currentUser, index) => {
      if (currentUser.id == brand.id) {
        this.brands.splice(index, 1)
      }
    })

    ApiMethodsService.getInstance().delete("brand/" + brand.id, true).then(r => {
      alert("brand has been deleted")
    })
  }
}
