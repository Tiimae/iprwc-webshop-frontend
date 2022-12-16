import {Injectable} from "@angular/core";
import {BehaviorSubject, Observable, of, Subject} from "rxjs";
import {SupplierModel} from "../../_models/supplier.model";
import {ApiMethodsService} from "../api-methods.service";

@Injectable({
  providedIn: 'root',
})
export class SupplierDataService {
  suppliers: SupplierModel[] = []
  suppliers$: Subject<SupplierModel[]> = new BehaviorSubject<SupplierModel[]>([]);

    constructor(
      private apiMethod: ApiMethodsService
    ) {
      this.getAll();
    }

  public async getAll(): Promise<void> {
    await this.apiMethod.get('supplier', true).then(r => {
      this.suppliers = r.data.payload
      this.suppliers$.next(this.suppliers);
    });
  }

  public get(supplierId: string): Observable<SupplierModel | undefined> {
    if (this.suppliers.length != 0) {
      return of(<SupplierModel>this.suppliers.find(supplier => supplier.id === supplierId));
    }

    return of(undefined);
  }

  public post(supplier: SupplierModel): void {
      const payload = {
        name: supplier.name,
        address: supplier.address,
        zipcode: supplier.zipcode,
        city: supplier.city,
        country: supplier.country,
        productIds: []
      }

    ApiMethodsService.getInstance().post("supplier", payload, true).then(r => {
      this.suppliers.push(r.data.payload);
      this.suppliers$.next(this.suppliers);
    });
  }

  public put(supplier: SupplierModel): void {
    const payload = {
      name: supplier.name,
      address: supplier.address,
      zipcode: supplier.zipcode,
      city: supplier.city,
      country: supplier.country,
    }

    ApiMethodsService.getInstance().put("supplier/" + supplier.id, payload, true).then(r => {
      this.suppliers[this.suppliers.findIndex(currentSupplier => currentSupplier.id === supplier.id)] = r.data.payload
    })
  }

  public remove(supplier: SupplierModel): void {
    this.suppliers.forEach((currentSupplier, index) => {
      if (currentSupplier.id == supplier.id) {
        this.suppliers.splice(index, 1)
      }
    })

    this.apiMethod.delete("supplier/" + supplier.id, true).then(r => {
      this.suppliers$.next(this.suppliers)
    })
  }
}
