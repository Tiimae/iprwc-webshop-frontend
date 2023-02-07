import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { AxiosResponse } from 'axios';
import { ToastrService } from 'ngx-toastr';
import { BehaviorSubject, Observable, of, Subject } from 'rxjs';
import { SupplierModel } from '../../_models/supplier.model';
import { ApiMethodsService } from '../_api/api-methods.service';

@Injectable({
  providedIn: 'root'
})
export class SupplierDataService {
  private suppliers: SupplierModel[] = [];
  public suppliers$: Subject<SupplierModel[]> = new BehaviorSubject<
    SupplierModel[]
  >([]);

  constructor(
    private apiMethod: ApiMethodsService,
    private toastr: ToastrService,
    private router: Router
  ) {}

  public async getAll(): Promise<void> {
    await this.apiMethod.get('supplier', false).then((r: AxiosResponse) => {
      this.suppliers = r.data.payload;
      this.suppliers$.next(this.suppliers);
    });
  }

  public get(supplierId: string): Observable<SupplierModel | undefined> {
    if (this.suppliers.length != 0) {
      return of(
        <SupplierModel>(
          this.suppliers.find((supplier) => supplier.id === supplierId)
        )
      );
    }

    return of(undefined);
  }

  public getByRequest(supplierId: string): Promise<AxiosResponse> {
    return this.apiMethod.get('supplier/' + supplierId, true);
  }

  public post(supplier: SupplierModel): void {
    const payload = {
      name: supplier.name,
      address: supplier.address,
      zipcode: supplier.zipcode,
      city: supplier.city,
      country: supplier.country,
      productIds: []
    };

    this.apiMethod
      .post('supplier', payload, true)
      .then((res: AxiosResponse) => {
        if (res.data.code === 202) {
          this.suppliers.push(res.data.payload);
          this.suppliers$.next(this.suppliers);

          this.toastr.success(
            'Supplier has been created successfully!',
            'Created'
          );
          this.router.navigate(['dashboard', 'admin', 'suppliers']);
        } else if (res.data.code === 400) {
          this.toastr.error(res.data.message, res.data.code);
        }
      });
  }

  public put(supplier: SupplierModel): void {
    const payload = {
      name: supplier.name,
      address: supplier.address,
      zipcode: supplier.zipcode,
      city: supplier.city,
      country: supplier.country
    };

    this.apiMethod
      .put('supplier/' + supplier.id, payload, true)
      .then((res: AxiosResponse) => {
        if (res.data.code === 202) {
          this.suppliers[
            this.suppliers.findIndex(
              (currentSupplier) => currentSupplier.id === supplier.id
            )
          ] = res.data.payload;
          this.toastr.success(
            'Supplier has been updated successfully!',
            'Updated'
          );
          this.router.navigate(['dashboard', 'admin', 'suppliers']);
        } else if (res.data.code === 400) {
          this.toastr.error(res.data.message, res.data.code);
        }
      });
  }

  public remove(supplier: SupplierModel): void {
    this.apiMethod
      .delete('supplier/' + supplier.id, true)
      .then((res: AxiosResponse) => {
        if (res.data.code === 202) {
          this.suppliers$.next(this.suppliers);
          this.suppliers.forEach((currentSupplier, index) => {
            if (currentSupplier.id == supplier.id) {
              this.suppliers.splice(index, 1);
            }
          });
        } else if (res.data.code === 400) {
          this.toastr.error(res.data.message, res.data.code);
        }
      });
  }
}
