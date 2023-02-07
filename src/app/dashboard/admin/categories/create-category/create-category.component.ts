import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { CategoryModel } from '../../../../_models/category.model';
import { CategoryDataService } from '../../../../_service/_data/categoryData.service';

@Component({
  selector: 'app-create-category',
  templateUrl: './create-category.component.html',
  styleUrls: ['./create-category.component.scss']
})
export class CreateCategoryComponent implements OnInit {
  categoryCreateForm = new FormGroup({
    catname: new FormControl('', [Validators.required])
  });

  constructor(
    private router: Router,
    private categoryDataService: CategoryDataService,
    private toastr: ToastrService
  ) {}

  ngOnInit(): void {}

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

    const request: boolean = this.categoryDataService.createCategory(category);

    if (request) {
      this.toastr.success('Brand Has been created successfully!', 'Created');
      this.router.navigate(['dashboard', 'admin', 'categories']);
    }
  }
}
