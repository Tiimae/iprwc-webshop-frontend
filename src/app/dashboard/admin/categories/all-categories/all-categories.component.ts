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

  constructor(
    private categoryDataService: CategoryDataService
  ) { }

  async ngOnInit(): Promise<void> {

    this.categoryDataService
      .categories$
      .subscribe(r => {
        this.allCategories = r;
      });

  }

  removeCategoryOutArray(event: CategoryModel): void {
    this.categoryDataService.removeCategory(event)
  }

}
