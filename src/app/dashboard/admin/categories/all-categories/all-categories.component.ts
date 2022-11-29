import {Component, OnInit} from '@angular/core';
import {CategoryModel} from 'src/app/_models/category.model';
import {ApiMethodsService} from 'src/app/_service/api-methods.service';

@Component({
  selector: 'app-all-categories',
  templateUrl: './all-categories.component.html',
  styleUrls: ['./all-categories.component.scss']
})
export class AllCategoriesComponent implements OnInit {

  allCategories: CategoryModel[] = []

  constructor() { }

  ngOnInit(): void {

    ApiMethodsService.getInstance().get("category", true).then(r => {
      r.data.payload.forEach((category: CategoryModel) => {
        this.allCategories.push(category as CategoryModel);
      });
    });

  }

  removeCategoryOutArray(category: CategoryModel): void {
    this.allCategories.forEach((currentCategory, index) => {
      if (currentCategory.id == category.id) {
        this.allCategories.splice(index, 1)
      }
    })
  }

}
