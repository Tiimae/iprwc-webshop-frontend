import {Component, OnInit, ViewChild} from '@angular/core';
import {NgForm} from "@angular/forms";
import {Router} from "@angular/router";
import {ApiMethodsService} from "../../../../_service/api-methods.service";

@Component({
  selector: 'app-create-brand',
  templateUrl: './create-brand.component.html',
  styleUrls: ['./create-brand.component.scss']
})
export class CreateBrandComponent implements OnInit {

  @ViewChild('f') createForm: NgForm | undefined;

  uploadedImage: File | undefined;

  constructor(private router: Router) { }

  ngOnInit(): void {
  }

  public onImageUpload(event: any) {
    this.uploadedImage = event.target.files[0];
  }


  public onSubmit(): void {

    const formData = new FormData();
    // @ts-ignore
    formData.append('logo', this.uploadedImage)

    const payload = {
      "brandName": this.createForm?.form.controls['brandname'].value,
      "webPage": this.createForm?.form.controls['url'].value,
      "logo": "",
      "productIds": []
    }

    ApiMethodsService.getInstance().post("brand", payload, true).then(r => {
      ApiMethodsService.getInstance().post("brand/" + r.data.payload.id + '/image', formData, true).then(r => {
        console.log(r)
      })
    })
  }

}
