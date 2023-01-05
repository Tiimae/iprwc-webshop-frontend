import {Component, OnInit} from '@angular/core';
import {FormControl, FormGroup, Validators} from "@angular/forms";
import {Router} from "@angular/router";
import {BrandModel} from 'src/app/_models/brand.model';
import {BrandDataService} from 'src/app/_service/data/brandData.service';
import {ToastrService} from "ngx-toastr";

@Component({
  selector: 'app-create-brand',
  templateUrl: './create-brand.component.html',
  styleUrls: ['./create-brand.component.scss']
})
export class CreateBrandComponent implements OnInit {

  brandCreateForm = new FormGroup({
    brandName: new FormControl('', [Validators.required]),
    url: new FormControl('', [Validators.required]),
    logo: new FormControl('', [Validators.required]),
  })

  uploadedImage!: File;

  constructor(
    private router: Router,
    private brandDataService: BrandDataService,
    private toastr: ToastrService
  ) { }

  ngOnInit(): void {
  }

  public onImageUpload(event: any) {
    this.uploadedImage = event.target.files[0];
  }


  public onSubmit(): void {

    const brandName = this.brandCreateForm.controls.brandName.value
    const webPage = this.brandCreateForm.controls.url.value

    if (brandName == null || webPage == null) {
      this.toastr.error('Something is wrong!', 'Failed');
      return;
    }

    if (!this.brandCreateForm.valid) {
      this.toastr.error('Something is wrong!', 'Failed');
      return;
    }

    const brand = new BrandModel("", brandName, webPage, this.uploadedImage)
    brand.image = this.uploadedImage
    const request: boolean = this.brandDataService.create(brand);

    if (request) {
      this.toastr.success("Brand Has been created successfully!", "Created")
      this.router.navigate(["dashboard", "admin", "brands"])
    }

  }

}
