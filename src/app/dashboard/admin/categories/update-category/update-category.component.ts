import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { AxiosResponse } from 'axios';
import * as CryptoJs from 'crypto-js';
import { ToastrService } from 'ngx-toastr';
import { CategoryModel } from '../../../../_models/category.model';
import { ApiConnectorService } from '../../../../_service/_api/api-connector.service';
import { CategoryDataService } from '../../../../_service/_data/categoryData.service';
import {Title} from "@angular/platform-browser";

@Component({
  selector: 'app-update-category',
  templateUrl: './update-category.component.html',
  styleUrls: ['./update-category.component.scss']
})
export class UpdateCategoryComponent implements OnInit {
  private categoryId: string = '';
  private category!: CategoryModel;

  public categoryCreateForm: FormGroup = new FormGroup({
    catname: new FormControl('', [Validators.required])
  });

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private categoryDataService: CategoryDataService,
    private toastr: ToastrService,
    private api: ApiConnectorService,
    private title: Title
  ) {}

  ngOnInit(): void {
    this.route.params.subscribe(async (params) => {
      this.categoryId = params['categoryId']
      this.categoryDataService
        .getCurrentCategory(this.categoryId)
        .subscribe((r: CategoryModel | undefined) => {
          if (r == undefined) {
            this.categoryDataService
              .getCategoryByRequest(this.categoryId)
              .then((res: AxiosResponse) => {
                if (res.data.code === 202) {
                  this.category = res.data.payload;
                  this.setFormData();
                } else if (res.data.code === 400) {
                  this.toastr.error(res.data.message, res.data.code);
                  this.router.navigate(['dashboard', 'admin', 'categories']);
                }
              });
          } else {
            this.category = r;
            this.setFormData();
          }
        });
    });
  }

  public setFormData(): void {
    this.categoryCreateForm.controls['catname'].setValue(
      this.category.categoryName
    );

    this.title.setTitle(`F1 Webshop | Update Category - ${this.category.categoryName}`);
  }

  public onSubmit(): void {
    const catName = this.categoryCreateForm.controls['catname'].value;

    if (catName == null) {
      this.toastr.error('Something is wrong!', 'Failed');
      return;
    }

    if (!this.categoryCreateForm.valid) {
      this.toastr.error('Something is wrong!', 'Failed');
      return;
    }

    const category = new CategoryModel(this.category.id, catName);

    this.categoryDataService.updateCategory(category);
  }
}
