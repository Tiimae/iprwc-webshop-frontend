import {Component, OnInit} from '@angular/core';
import {ToastrService} from 'ngx-toastr';
import {AppComponent} from '../../../../app.component';
import {SupplierModel} from '../../../../_models/supplier.model';
import {SupplierDataService} from '../../../../_service/_data/supplierData.service';
import {Title} from "@angular/platform-browser";

@Component({
  selector: 'app-all-suppliers',
  templateUrl: './all-suppliers.component.html',
  styleUrls: ['./all-suppliers.component.scss']
})
export class AllSuppliersComponent implements OnInit {
  public allSuppliers: SupplierModel[] = [];
  private count: number = 0;

  constructor(
    private supplierDataService: SupplierDataService,
    private toastr: ToastrService,
    private title: Title
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

    this.title.setTitle("F1 Webshop | All Suppliers")

    AppComponent.isLoading = false;
  }

  public removeUserOutArray(event: SupplierModel): void {
    this.supplierDataService.remove(event);
  }
}
