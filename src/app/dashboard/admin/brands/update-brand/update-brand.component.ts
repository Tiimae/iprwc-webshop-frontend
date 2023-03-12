import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import {ActivatedRoute, Params, Router} from '@angular/router';
import { AxiosResponse } from 'axios';
import * as CryptoJs from 'crypto-js';
import { ToastrService } from 'ngx-toastr';
import { BrandModel } from '../../../../_models/brand.model';
import { ApiConnectorService } from '../../../../_service/_api/api-connector.service';
import { BrandDataService } from '../../../../_service/_data/brandData.service';
import {Title} from "@angular/platform-browser";

@Component({
  selector: 'app-update-brand',
  templateUrl: './update-brand.component.html',
  styleUrls: ['./update-brand.component.scss']
})
export class UpdateBrandComponent implements OnInit {
  public brandCreateForm: FormGroup = new FormGroup({
    brandName: new FormControl('', [Validators.required]),
    url: new FormControl('', [Validators.required]),
    logo: new FormControl('')
  });
  private uploadedImage!: File;
  private brandId: string = '';
  public brand!: BrandModel;

  constructor(
    private router: Router,
    private route: ActivatedRoute,
    private brandDataService: BrandDataService,
    private toastr: ToastrService,
    private api: ApiConnectorService,
    private title: Title
  ) {}

  ngOnInit(): void {
    this.route.params.subscribe(async (params: Params) => {
      this.brandId =  params['brandId']

      (this.brandDataService.get(this.brandId)).subscribe(
        (r: BrandModel | undefined) => {
          if (r == undefined) {
            this.brandDataService.getByRequest(this.brandId).then((res: AxiosResponse) => {
              if (res.data.code === 202) {
                this.brand = res.data.payload;
                this.setFormData();
              } else if (res.data.code === 400) {
                this.toastr.error(res.data.message, res.data.code);
                this.router.navigate(['dashboard', 'admin', 'brands']);
              }
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
    this.brandCreateForm.controls['brandName'].setValue(this.brand.brandName);
    this.brandCreateForm.controls['url'].setValue(this.brand.webPage);
    this.title.setTitle(`F1 Webshop | Update Brand - ${this.brand.brandName}`)
  }

  public onImageUpload(event: any): void {
    this.uploadedImage = event.target.files[0];
  }

  onSubmit(): void {
    const brandName = this.brandCreateForm.controls['brandName'].value;
    const webPage = this.brandCreateForm.controls['url'].value;

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
    this.brandDataService.update(brand);
  }
}
