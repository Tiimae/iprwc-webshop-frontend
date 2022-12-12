import {Component, OnInit, ViewChild} from '@angular/core';
import {BrandDataService} from "../../../../_service/data/brandData.service";
import * as CryptoJs from "crypto-js";
import {ApiConnectorService} from "../../../../_service/api-connector.service";
import {ActivatedRoute, Router} from "@angular/router";
import {BrandModel} from "../../../../_models/brand.model";
import {NgForm} from "@angular/forms";

@Component({
  selector: 'app-update-brand',
  templateUrl: './update-brand.component.html',
  styleUrls: ['./update-brand.component.scss']
})
export class UpdateBrandComponent implements OnInit {

  @ViewChild('f') createForm: NgForm | undefined;

  uploadedImage!: File;
  brandId: string = "";
  brand!: BrandModel;

  constructor(
    private router: Router,
    private route: ActivatedRoute,
    private brandDataService: BrandDataService,
  ) { }

  ngOnInit(): void {

    this.route.params.subscribe(async (params) => {
      const currentBrandId = params['brandId'].replaceAll("*", "/");
      this.brandId = CryptoJs.Rabbit.decrypt(currentBrandId, await ApiConnectorService.getInstance().getDecryptKey()).toString(CryptoJs.enc.Utf8);

      (await this.brandDataService
        .get(this.brandId))
        .subscribe((r: BrandModel) => {
          this.brand = r;
        })

      this.createForm?.form.controls['brandname'].setValue(this.brand.brandName)
      this.createForm?.form.controls['url'].setValue(this.brand.webPage)
    })
  }

  public onImageUpload(event: any) {
    this.uploadedImage = event.target.files[0];
  }

  onSubmit(): void {
    const brandName = this.createForm?.form.controls['brandname'].value
    const webPage = this.createForm?.form.controls['url'].value

    const brand = new BrandModel(this.brandId, brandName, webPage, this.brand.logoUrl)
    brand.image = this.uploadedImage
    this.brandDataService.update(brand);
    this.router.navigate(["dashboard", "admin", "brands"])
  }

}
