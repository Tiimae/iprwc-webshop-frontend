import {Component, OnInit} from '@angular/core';
import {SupplierModel} from "../../../../_models/supplier.model";
import {SupplierDataService} from "../../../../_service/data/supplierData.service";

@Component({
  selector: 'app-all-suppliers',
  templateUrl: './all-suppliers.component.html',
  styleUrls: ['./all-suppliers.component.scss']
})
export class AllSuppliersComponent implements OnInit {

  allSuppliers: SupplierModel[] = [];

  constructor(
    private supplierDataService: SupplierDataService
  ) { }

  ngOnInit(): void {
    this.supplierDataService
      .suppliers$
      .subscribe(r => {
        this.allSuppliers = r
      })
  }

  removeUserOutArray(event: SupplierModel) {
    this.supplierDataService.remove(event);
  }

}
