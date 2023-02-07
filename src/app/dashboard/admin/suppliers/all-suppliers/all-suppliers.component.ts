import { Component, OnInit } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { AppComponent } from '../../../../app.component';
import { SupplierModel } from '../../../../_models/supplier.model';
import { SupplierDataService } from '../../../../_service/_data/supplierData.service';

@Component({
  selector: 'app-all-suppliers',
  templateUrl: './all-suppliers.component.html',
  styleUrls: ['./all-suppliers.component.scss']
})
export class AllSuppliersComponent implements OnInit {
  allSuppliers: SupplierModel[] = [];
  private count: number = 0;

  constructor(
    private supplierDataService: SupplierDataService,
    private toastr: ToastrService
  ) {}

  ngOnInit(): void {
    AppComponent.isLoading = true;
    this.supplierDataService.suppliers$.subscribe((r) => {
      if (r.length < 1 && this.count == 0) {
        this.supplierDataService.getAll();
        this.count = 1;
      }

      this.allSuppliers = r.sort((a, b) => {
        if (a.name < b.name) {
          return -1;
        }
        if (a.name > b.name) {
          return 1;
        }
        return 0;
      });
    });

    AppComponent.isLoading = false;
  }

  removeUserOutArray(event: SupplierModel) {
    this.supplierDataService.remove(event);
    this.toastr.success('Product has been deleted successfully!', 'Deleted');
  }
}
