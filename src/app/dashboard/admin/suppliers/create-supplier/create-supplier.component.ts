import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { SupplierModel } from 'src/app/_models/supplier.model';
import { SupplierDataService } from '../../../../_service/_data/supplierData.service';

@Component({
  selector: 'app-create-supplier',
  templateUrl: './create-supplier.component.html',
  styleUrls: ['./create-supplier.component.scss']
})
export class CreateSupplierComponent implements OnInit {
  supplierCreateForm = new FormGroup({
    name: new FormControl('', [Validators.required]),
    address: new FormControl('', [Validators.required]),
    zipcode: new FormControl('', [Validators.required]),
    city: new FormControl('', [Validators.required]),
    country: new FormControl('', [Validators.required])
  });

  constructor(
    private supplierDataService: SupplierDataService,
    private router: Router,
    private toastr: ToastrService
  ) {}

  ngOnInit(): void {}

  public onSubmit() {
    const name = this.supplierCreateForm.controls.name.value;
    const address = this.supplierCreateForm.controls.address.value;
    const zipcode = this.supplierCreateForm.controls.zipcode.value;
    const city = this.supplierCreateForm.controls.city.value;
    const country = this.supplierCreateForm.controls.country.value;

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

    if (!this.supplierCreateForm.valid) {
      this.toastr.error('Something is wrong!', 'Failed');
      return;
    }

    const supplier = new SupplierModel(
      '',
      name,
      address,
      zipcode,
      city,
      country
    );

    const request: boolean = this.supplierDataService.post(supplier);

    if (request) {
      this.toastr.success('Supplier has been created successfully!', 'Created');
      this.router.navigate(['dashboard', 'admin', 'suppliers']);
    }
  }
}
