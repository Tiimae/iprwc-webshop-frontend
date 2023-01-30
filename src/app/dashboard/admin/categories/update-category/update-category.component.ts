import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import * as CryptoJs from 'crypto-js';
import { ToastrService } from 'ngx-toastr';
import { CategoryModel } from '../../../../_models/category.model';
import { ApiConnectorService } from '../../../../_service/api-connector.service';
import { CategoryDataService } from '../../../../_service/data/categoryData.service';

@Component({
  selector: 'app-update-category',
  templateUrl: './update-category.component.html',
  styleUrls: ['./update-category.component.scss'],
})
export class UpdateCategoryComponent implements OnInit {
  categoryId: string = '';
  category!: CategoryModel;

  categoryCreateForm = new FormGroup({
    catname: new FormControl('', [Validators.required]),
  });

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private categoryDataService: CategoryDataService,
    private toastr: ToastrService,
    private api: ApiConnectorService
  ) {}

  ngOnInit(): void {
    this.route.params.subscribe(async (params) => {
      const currentUserId = params['categoryId'].replaceAll('*', '/');

      this.categoryId = CryptoJs.Rabbit.decrypt(
        currentUserId,
        await this.api.getDecryptKey()
      ).toString(CryptoJs.enc.Utf8);

      this.categoryDataService
        .getCurrentCategory(this.categoryId)
        .subscribe((r) => {
          if (r == undefined) {
            this.categoryDataService
              .getCategoryByRequest(this.categoryId)
              .then((res) => {
                this.category = res.data.payload;
                this.setFormData();
              });
          } else {
            this.category = r;
            this.setFormData();
          }
        });
    });
  }

  public setFormData(): void {
    this.categoryCreateForm.controls.catname.setValue(
      this.category.categoryName
    );
  }

  onSubmit(): void {
    const catName = this.categoryCreateForm.controls.catname.value;

    if (catName == null) {
      this.toastr.error('Something is wrong!', 'Failed');
      return;
    }

    if (!this.categoryCreateForm.valid) {
      this.toastr.error('Something is wrong!', 'Failed');
      return;
    }

    const category = new CategoryModel('', catName);

    const request: boolean = this.categoryDataService.updateCategory(category);

    if (request) {
      this.toastr.success('Brand Has been created successfully!', 'Created');
      this.router.navigate(['dashboard', 'admin', 'categories']);
    }
  }
}
