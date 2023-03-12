import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import * as CryptoJs from 'crypto-js';
import { ToastrService } from 'ngx-toastr';
import { SupplierModel } from '../../../../_models/supplier.model';
import { ApiConnectorService } from '../../../../_service/_api/api-connector.service';
import { SupplierDataService } from '../../../../_service/_data/supplierData.service';
import {Title} from "@angular/platform-browser";

@Component({
  selector: 'app-update-supplier',
  templateUrl: './update-supplier.component.html',
  styleUrls: ['./update-supplier.component.scss']
})
export class UpdateSupplierComponent implements OnInit {
  private supplierId: string = '';
  private supplier!: SupplierModel;

  public supplierUpdateForm: FormGroup = new FormGroup({
    name: new FormControl('', [Validators.required]),
    address: new FormControl('', [Validators.required]),
    zipcode: new FormControl('', [Validators.required]),
    city: new FormControl('', [Validators.required]),
    country: new FormControl('', [Validators.required])
  });

  constructor(
    private supplierDataService: SupplierDataService,
    private router: Router,
    private route: ActivatedRoute,
    private toastr: ToastrService,
    private api: ApiConnectorService,
    private title: Title
  ) {}

  ngOnInit(): void {
    this.route.params.subscribe(async (params) => {
      this.supplierId =  params['supplierId']

      this.supplierDataService.get(this.supplierId).subscribe({
        next: (supplier: SupplierModel | undefined): void => {
          if (supplier == undefined) {
            this.supplierDataService
              .getByRequest(this.supplierId)
              .then((res) => {
                if (res.data.code === 202) {
                  this.supplier = res.data.payload;
                  this.setFormData();
                } else if (res.data.code === 400) {
                  this.toastr.error(res.data.message, res.data.code);
                  this.router.navigate(['dashboard', 'admin', 'suppliers']);
                }
              });
          } else {
            this.supplier = supplier;
            this.setFormData();
          }
        },
        error(e: Error) {
          console.log(e.message);
        },
        complete: () => {}
      });
    });
  }

  private setFormData(): void {
    this.supplierUpdateForm.controls['name'].setValue(this.supplier.name);
    this.supplierUpdateForm.controls['address'].setValue(this.supplier.address);
    this.supplierUpdateForm.controls['zipcode'].setValue(this.supplier.zipcode);
    this.supplierUpdateForm.controls['city'].setValue(this.supplier.city);
    this.supplierUpdateForm.controls['country'].setValue(this.supplier.country);
    this.title.setTitle(`F1 Webshop | Update Supplier - ${this.supplier.name}`)
  }

  public onSubmit(): void {
    const name = this.supplierUpdateForm.controls['name'].value;
    const address = this.supplierUpdateForm.controls['address'].value;
    const zipcode = this.supplierUpdateForm.controls['zipcode'].value;
    const city = this.supplierUpdateForm.controls['city'].value;
    const country = this.supplierUpdateForm.controls['country'].value;

    if (
      name == null ||
      address == null ||
      zipcode == null ||
      city == null ||
      country == null
    ) {
      this.toastr.error('Something is wrong!', 'Failed');
      return;
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

    this.supplierDataService.put(supplier);
  }
}
