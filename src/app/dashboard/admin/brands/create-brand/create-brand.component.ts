import {Component, OnInit, ViewChild} from '@angular/core';
import {NgForm} from "@angular/forms";
import {Router} from "@angular/router";
import { BrandModel } from 'src/app/_models/brand.model';
import { BrandDataService } from 'src/app/_service/data/brandData.service';
import {ApiMethodsService} from "../../../../_service/api-methods.service";

@Component({
  selector: 'app-create-brand',
  templateUrl: './create-brand.component.html',
  styleUrls: ['./create-brand.component.scss']
})
export class CreateBrandComponent implements OnInit {

  @ViewChild('f') createForm: NgForm | undefined;

  uploadedImage!: File;

  constructor(
    private router: Router,
    private brandDataService: BrandDataService,
  ) { }

  ngOnInit(): void {
  }

  public onImageUpload(event: any) {
    this.uploadedImage = event.target.files[0];
  }


  public onSubmit(): void {

    const brandName = this.createForm?.form.controls['brandname'].value
    const webPage = this.createForm?.form.controls['url'].value

    const brand = new BrandModel("", brandName, webPage, this.uploadedImage)
    brand.image = this.uploadedImage
    this.brandDataService.create(brand);
    this.router.navigate(["dashboard", "admin", "brands"])

  }

}
