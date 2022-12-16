import {Component, OnInit} from '@angular/core';
import {ActivatedRoute, Router} from "@angular/router";
import {ApiConnectorService} from "../../../../_service/api-connector.service";
import * as CryptoJs from "crypto-js";
import {FormControl, FormGroup, Validators} from "@angular/forms";
import {CategoryDataService} from "../../../../_service/data/categoryData.service";
import {CategoryModel} from "../../../../_models/category.model";

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
    private categoryDataService: CategoryDataService) {
  }

  ngOnInit(): void {
    this.route.params.subscribe(async (params) => {
        const currentUserId = params['categoryId'].replaceAll("*", "/")

        this.categoryId = CryptoJs.Rabbit.decrypt(currentUserId, await ApiConnectorService.getInstance().getDecryptKey()).toString(CryptoJs.enc.Utf8)

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
      return
    }

    if (!this.categoryCreateForm.valid) {
      return;
    }

    const category = new CategoryModel(this.categoryId, catName)

    this.categoryDataService.updateCategory(category)
    this.router.navigate(['dashboard', "admin", "categories"])
  }

}
