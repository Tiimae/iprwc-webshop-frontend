import {Component, OnInit} from '@angular/core';
import {ActivatedRoute, Router} from "@angular/router";
import {ApiConnectorService} from "../../../../_service/api-connector.service";
import * as CryptoJs from "crypto-js";
import {FormControl, FormGroup, Validators} from "@angular/forms";
import {CategoryDataService} from "../../../../_service/data/categoryData.service";
import {CategoryModel} from "../../../../_models/category.model";
import {ToastrService} from "ngx-toastr";

@Component({
  selector: 'app-update-category',
  templateUrl: './update-category.component.html',
  styleUrls: ['./update-category.component.scss']
})
export class UpdateCategoryComponent implements OnInit {

  categoryId: string = "";
  category: CategoryModel | undefined;

  categoryCreateForm = new FormGroup({
    catname: new FormControl('', [Validators.required]),
  })

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private categoryDataService: CategoryDataService,
    private toastr: ToastrService,
    private api: ApiConnectorService
  ) {
  }

  ngOnInit(): void {
    this.route.params.subscribe(async (params) => {
      const currentUserId = params['categoryId'].replaceAll("*", "/")

      this.categoryId = CryptoJs.Rabbit.decrypt(currentUserId, await this.api.getDecryptKey()).toString(CryptoJs.enc.Utf8)

      this.categoryDataService
        .getCurrentCategory(this.categoryId)
        .subscribe((r) => {
          if (r == undefined) {
            this.router.navigate(["dashboard", "admin", "categories"])
          }

          this.category = r;

          if (this.category != undefined) {
            this.categoryCreateForm.controls.catname.setValue(this.category.categoryName);
          }
        })

    })
  }

  onSubmit(): void {
    const catName = this.categoryCreateForm.controls.catname.value;

    if (catName == null) {
      this.toastr.error('Something is wrong!', 'Failed');
      return
    }

    if (!this.categoryCreateForm.valid) {
      this.toastr.error('Something is wrong!', 'Failed');
      return;
    }

    const category = new CategoryModel("", catName)

    const request: boolean = this.categoryDataService.updateCategory(category)

    if (request) {
      this.toastr.success("Brand Has been created successfully!", "Created")
      this.router.navigate(['dashboard', "admin", "categories"])
    }
  }

}
