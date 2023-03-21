import {Component, OnInit} from '@angular/core';
import {FormControl, FormGroup, Validators} from '@angular/forms';
import {Router} from '@angular/router';
import {ToastrService} from 'ngx-toastr';
import {CategoryModel} from '../../../../_models/category.model';
import {CategoryDataService} from '../../../../_service/_data/categoryData.service';
import {Title} from "@angular/platform-browser";

@Component({
  selector: 'app-create-category',
  templateUrl: './create-category.component.html',
  styleUrls: ['./create-category.component.scss']
})
export class CreateCategoryComponent implements OnInit {
  public categoryCreateForm = new FormGroup({
    catname: new FormControl('', [Validators.required])
  });

  constructor(
    private router: Router,
    private categoryDataService: CategoryDataService,
    private toastr: ToastrService,
    private title: Title
  ) {}

  ngOnInit(): void {
    this.title.setTitle("F1 Webshop | Create Category");
  }

  public onSubmit(): void {
    const catName = this.categoryCreateForm.controls.catname.value;

    if (catName == null) {
      this.toastr.error('Something is wrong!', 'Failed');
      return;
    }

    if (!this.categoryCreateForm.valid) {
      this.toastr.error('Something is wrong!', 'Failed');
      return;
    }

    const category: CategoryModel = new CategoryModel('', catName);

    this.categoryDataService.createCategory(category);
  }
}
