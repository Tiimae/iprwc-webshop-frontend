import {Injectable} from '@angular/core';
import {Router} from '@angular/router';
import {AxiosResponse} from 'axios';
import {ToastrService} from 'ngx-toastr';
import {BehaviorSubject, Observable, of, Subject} from 'rxjs';
import {BrandModel} from 'src/app/_models/brand.model';
import {v4 as uuid} from 'uuid';
import {ApiMethodsService} from '../_api/api-methods.service';

@Injectable({
  providedIn: 'root'
})
export class BrandDataService {
  private brands: BrandModel[] = [];
  public brands$: Subject<BrandModel[]> = new BehaviorSubject<BrandModel[]>([]);

  constructor(
    private toastr: ToastrService,
    private api: ApiMethodsService,
    private router: Router
  ) {
  }

  public get(brandId: string): Observable<BrandModel | undefined> {
    if (this.brands.length > 0) {
      return of(<BrandModel>this.brands.find((brand) => brand.id === brandId));
    }

    return of(undefined);
  }

  public async getByRequest(brandId: string): Promise<AxiosResponse> {
    return await this.api.get('brand/' + brandId, true);
  }

  public async getAll(): Promise<void> {
    await this.api.get('brand', false).then((r) => {
      this.brands = r.data.payload;
      this.brands$.next(this.brands);
    });
  }

  public create(brand: BrandModel): void {
    const formData = new FormData();
    const extension = brand.image.type.split('/')[1];
    formData.append('logo', brand.logoUrl, uuid() + '.' + extension);
    formData.append(
      'brand',
      JSON.stringify({
        brandName: brand.brandName,
        webPage: brand.webPage,
        logo: '',
        productIds: []
      })
    );

    this.api.post('brand', formData, true).then((r: AxiosResponse) => {
      if (r.data.code === 202) {
        this.brands.push(r.data.payload);
        this.brands$.next(this.brands);
        this.toastr.success('Brand Has been created successfully!', 'Created');
        this.router.navigate(['dashboard', 'admin', 'brands']);
      } else if (r.data.code === 400) {
        this.toastr.error(r.data.message, r.data.code);
      }
    });
  }

  public update(brand: BrandModel): void {
    const formData = new FormData();
    if (brand.image != null) {
      formData.append('logo', brand.image, brand.image.name);
    }
    formData.append(
      'brand',
      JSON.stringify({
        brandName: brand.brandName,
        webPage: brand.webPage,
        logo: '',
        productIds: []
      })
    );

    this.api
      .put('brand/' + brand.id, formData, true)
      .then((r: AxiosResponse) => {
        if (r.data.payload === 202 || r.data.payload === 200) {
          this.brands[
            this.brands.findIndex(
              (currentBrand: BrandModel) =>
                currentBrand.id === r.data.payload.id
            )
            ] = r.data.payload;
          this.brands$.next(this.brands);

          this.toastr.success(
            'Brand Has been updated successfully!',
            'Updated!'
          );

          this.router.navigate(['dashboard', 'admin', 'brands']);
        } else if (r.data.code === 400) {
          this.toastr.error(r.data.message, r.data.code);
        }
      });
  }

  public remove(brand: BrandModel): void {
    this.api.delete('brand/' + brand.id, true).then((r) => {
      if (r.data.code === 202) {
        this.brands.forEach((currentUser, index) => {
          if (currentUser.id == brand.id) {
            this.brands.splice(index, 1);
          }
        });
        this.brands$.next(this.brands);
        this.toastr.success('Brand has been deleted successfully!', 'Deleted');
      } else if (r.data.code === 400) {
        this.toastr.error(r.data.message, r.data.code);
      }
    });
  }
}
