import {Component, OnInit} from '@angular/core';
import {SupplierModel} from "../../../../_models/supplier.model";
import {SupplierDataService} from "../../../../_service/data/supplierData.service";
import {ToastrService} from "ngx-toastr";

@Component({
  selector: 'app-all-suppliers',
  templateUrl: './all-suppliers.component.html',
  styleUrls: ['./all-suppliers.component.scss']
})
export class AllSuppliersComponent implements OnInit {

  allSuppliers: SupplierModel[] = [];

  constructor(
    private supplierDataService: SupplierDataService,
    private toastr: ToastrService
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
    this.toastr.success("Product has been deleted successfully!", "Deleted")
  }

}
