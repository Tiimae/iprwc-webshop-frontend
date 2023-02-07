import { Injectable } from '@angular/core';
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
    private toastr: ToastrService
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

  public post(supplier: SupplierModel): boolean {
    let check = true;

    this.suppliers.forEach((currentSupplier: SupplierModel) => {
      if (supplier.name === currentSupplier.name) {
        this.toastr.error('Supplier name is already in user.', 'Failed');
        check = false;
      }
    });

    if (!check) {
      return check;
    }

    const payload = {
      name: supplier.name,
      address: supplier.address,
      zipcode: supplier.zipcode,
      city: supplier.city,
      country: supplier.country,
      productIds: []
    };

    this.apiMethod.post('supplier', payload, true).then((r: AxiosResponse) => {
      this.suppliers.push(r.data.payload);
      this.suppliers$.next(this.suppliers);
    });

    return check;
  }

  public put(supplier: SupplierModel): boolean {
    let check = true;

    this.suppliers.forEach((currentSupplier: SupplierModel) => {
      if (
        supplier.name === currentSupplier.name &&
        supplier.id !== currentSupplier.id
      ) {
        this.toastr.error('Supplier name is already in suppliers.', 'Failed');
        check = false;
      }
    });

    if (!check) {
      return check;
    }

    const payload = {
      name: supplier.name,
      address: supplier.address,
      zipcode: supplier.zipcode,
      city: supplier.city,
      country: supplier.country
    };

    this.apiMethod
      .put('supplier/' + supplier.id, payload, true)
      .then((r: AxiosResponse) => {
        this.suppliers[
          this.suppliers.findIndex(
            (currentSupplier) => currentSupplier.id === supplier.id
          )
        ] = r.data.payload;
      });

    return check;
  }

  public remove(supplier: SupplierModel): void {
    this.suppliers.forEach((currentSupplier, index) => {
      if (currentSupplier.id == supplier.id) {
        this.suppliers.splice(index, 1);
      }
    });

    this.apiMethod
      .delete('supplier/' + supplier.id, true)
      .then((r: AxiosResponse) => {
        this.suppliers$.next(this.suppliers);
      });
  }
}