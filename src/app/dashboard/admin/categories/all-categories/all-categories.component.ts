import {Component, OnInit} from '@angular/core';
import {CategoryModel} from 'src/app/_models/category.model';
import {ApiMethodsService} from 'src/app/_service/api-methods.service';
import {CategoryDataService} from "../../../../_service/data/categoryData.service";

@Component({
  selector: 'app-all-categories',
  templateUrl: './all-categories.component.html',
  styleUrls: ['./all-categories.component.scss']
})
export class AllCategoriesComponent implements OnInit {

  allCategories: CategoryModel[] = []

  constructor() { }

  ngOnInit(): void {

    CategoryDataService.getInstance()
      .getAllCategories()
      .subscribe(r => {
        this.allCategories = r;
      });

  }

  removeCategoryOutArray(event: CategoryModel): void {
    CategoryDataService.getInstance().removeCategory(event)
  }

}
