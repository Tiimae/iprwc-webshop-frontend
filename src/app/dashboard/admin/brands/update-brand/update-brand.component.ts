import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import * as CryptoJs from 'crypto-js';
import { ToastrService } from 'ngx-toastr';
import { BrandModel } from '../../../../_models/brand.model';
import { ApiConnectorService } from '../../../../_service/api-connector.service';
import { BrandDataService } from '../../../../_service/data/brandData.service';

@Component({
  selector: 'app-update-brand',
  templateUrl: './update-brand.component.html',
  styleUrls: ['./update-brand.component.scss'],
})
export class UpdateBrandComponent implements OnInit {
  brandCreateForm = new FormGroup({
    brandName: new FormControl('', [Validators.required]),
    url: new FormControl('', [Validators.required]),
    logo: new FormControl(''),
  });
  uploadedImage!: File;
  brandId: string = '';
  brand!: BrandModel;

  constructor(
    private router: Router,
    private route: ActivatedRoute,
    private brandDataService: BrandDataService,
    private toastr: ToastrService,
    private api: ApiConnectorService
  ) {}

  ngOnInit(): void {
    this.route.params.subscribe(async (params) => {
      const currentBrandId = params['brandId'].replaceAll('*', '/');
      this.brandId = CryptoJs.Rabbit.decrypt(
        currentBrandId,
        await this.api.getDecryptKey()
      ).toString(CryptoJs.enc.Utf8);

      (await this.brandDataService.get(this.brandId)).subscribe(
        (r: BrandModel | undefined) => {
          if (r == undefined) {
            this.brandDataService.getByRequest(this.brandId).then((res) => {
              this.brand = res.data.payload;
              this.setFormData();
            });
          } else {
            this.brand = r;
            this.setFormData();
          }
        }
      );
    });
  }

  private setFormData(): void {
    this.brandCreateForm.controls.brandName.setValue(this.brand.brandName);
    this.brandCreateForm.controls.url.setValue(this.brand.webPage);
  }

  public onImageUpload(event: any) {
    this.uploadedImage = event.target.files[0];
  }

  onSubmit(): void {
    const brandName = this.brandCreateForm.controls.brandName.value;
    const webPage = this.brandCreateForm.controls.url.value;

    if (brandName == null || webPage == null) {
      this.toastr.error('Something is wrong!', 'Failed');
      return;
    }

    if (!this.brandCreateForm.valid) {
      this.toastr.error('Something is wrong!', 'Failed');
      return;
    }

    const brand = new BrandModel(
      this.brandId,
      brandName,
      webPage,
      this.brand.logoUrl
    );
    brand.image = this.uploadedImage;

    const request: boolean = this.brandDataService.update(brand);

    if (request) {
      this.toastr.success('Brand Has been updated successfully!', 'Updated!');
      this.router.navigate(['dashboard', 'admin', 'brands']);
    }
  }
}
