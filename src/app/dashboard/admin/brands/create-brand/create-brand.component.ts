import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { BrandModel } from 'src/app/_models/brand.model';
import { BrandDataService } from 'src/app/_service/_data/brandData.service';

@Component({
  selector: 'app-create-brand',
  templateUrl: './create-brand.component.html',
  styleUrls: ['./create-brand.component.scss']
})
export class CreateBrandComponent implements OnInit {
  public brandCreateForm: FormGroup = new FormGroup({
    brandName: new FormControl('', [Validators.required]),
    url: new FormControl('', [Validators.required]),
    logo: new FormControl('', [Validators.required])
  });

  private uploadedImage!: File;

  constructor(
    private brandDataService: BrandDataService,
    private toastr: ToastrService
  ) {}

  ngOnInit(): void {}

  public onImageUpload(event: any) {
    this.uploadedImage = event.target.files[0];
  }

  public async onSubmit(): Promise<void> {
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

    const brand = new BrandModel('', brandName, webPage, this.uploadedImage);
    brand.image = this.uploadedImage;

    this.brandDataService.create(brand);
  }
}
