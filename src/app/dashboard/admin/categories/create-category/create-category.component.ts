import {Component, OnInit, ViewChild} from '@angular/core';
import {ApiMethodsService} from "../../../../_service/api-methods.service";
import {FormControl, FormGroup, NgForm, Validators} from "@angular/forms";
import {Router} from '@angular/router';
import {CategoryModel} from "../../../../_models/category.model";
import {CategoryDataService} from "../../../../_service/data/categoryData.service";

@Component({
  selector: 'app-create-category',
  templateUrl: './create-category.component.html',
  styleUrls: ['./create-category.component.scss']
})
export class CreateCategoryComponent implements OnInit {

  categoryCreateForm = new FormGroup({
    catname: new FormControl('', [Validators.required]),
  })

  constructor(
    private router: Router,
    private categoryDataService: CategoryDataService
  ) {
  }

  ngOnInit(): void {
  }

  onSubmit(): void {

    const catName = this.categoryCreateForm.controls.catname.value;

    if (catName == null) {
      return
    }

    if (!this.categoryCreateForm.valid) {
      return;
    }

    const category = new CategoryModel("", catName)

    this.categoryDataService.createCategory(category)
    this.router.navigate(['dashboard', "admin", "categories"])
  }

}
