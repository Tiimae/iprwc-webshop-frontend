import {Component, OnInit} from '@angular/core';
import {FormControl, FormGroup, Validators} from "@angular/forms";
import {SupplierDataService} from "../../../../_service/data/supplierData.service";
import {ActivatedRoute, Router} from "@angular/router";
import {SupplierModel} from "../../../../_models/supplier.model";
import * as CryptoJs from "crypto-js";
import {ApiConnectorService} from "../../../../_service/api-connector.service";
import {ToastrService} from "ngx-toastr";

@Component({
  selector: 'app-update-supplier',
  templateUrl: './update-supplier.component.html',
  styleUrls: ['./update-supplier.component.scss']
})
export class UpdateSupplierComponent implements OnInit {

  supplierId: string = "";
  supplier!: SupplierModel;

  supplierUpdateForm = new FormGroup({
    name: new FormControl('', [Validators.required]),
    address: new FormControl('', [Validators.required]),
    zipcode: new FormControl('', [Validators.required]),
    city: new FormControl('', [Validators.required]),
    country: new FormControl('', [Validators.required]),
  })

  constructor(
    private supplierDataService: SupplierDataService,
    private router: Router,
    private route: ActivatedRoute,
    private toastr: ToastrService,
    private api: ApiConnectorService
  ) { }

  ngOnInit(): void {

    this.route.params.subscribe(async (params) => {
      const currentSupplierId = params['supplierId'].replaceAll("*", "/");
      this.supplierId = CryptoJs.Rabbit.decrypt(currentSupplierId, await this.api.getDecryptKey()).toString(CryptoJs.enc.Utf8)

      this.supplierDataService
        .get(this.supplierId)
        .subscribe({
          next: (supplier: SupplierModel | undefined): void => {
            if (supplier == undefined) {
              this.router.navigate(['dashboard', 'admin', 'suppliers'])
              return;
            }

            this.supplier = supplier;

            this.supplierUpdateForm.controls.name.setValue(this.supplier.name);
            this.supplierUpdateForm.controls.address.setValue(this.supplier.address);
            this.supplierUpdateForm.controls.zipcode.setValue(this.supplier.zipcode);
            this.supplierUpdateForm.controls.city.setValue(this.supplier.city);
            this.supplierUpdateForm.controls.country.setValue(this.supplier.country);
          },
          error(e: Error) {
            console.log(e.message)
          },
          complete: () => {}
        })
    })

  }

  onSubmit(): void {
    const name = this.supplierUpdateForm.controls.name.value;
    const address = this.supplierUpdateForm.controls.address.value;
    const zipcode = this.supplierUpdateForm.controls.zipcode.value;
    const city = this.supplierUpdateForm.controls.city.value;
    const country = this.supplierUpdateForm.controls.country.value;

    if (name == null || address == null || zipcode == null || city == null || country == null) {
      this.toastr.error('Something is wrong!', 'Failed');
      return
    }

    if (!this.supplierUpdateForm.valid) {
      this.toastr.error('Something is wrong!', 'Failed');
      return;
    }

    const supplier = new SupplierModel(
      this.supplierId,
      name,
      address,
      zipcode,
      city,
      country
    );

    const request: boolean = this.supplierDataService.put(supplier);

    if (request) {
      this.toastr.success("Supplier has been updated successfully!", "Updated")
      this.router.navigate(['dashboard', 'admin', 'suppliers'])
    }
  }

}
