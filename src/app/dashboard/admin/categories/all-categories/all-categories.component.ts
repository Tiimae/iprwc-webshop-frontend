import {Component, OnInit} from '@angular/core';
import {CategoryModel} from 'src/app/_models/category.model';
import {AppComponent} from '../../../../app.component';
import {CategoryDataService} from '../../../../_service/_data/categoryData.service';
import {Title} from "@angular/platform-browser";

@Component({
  selector: 'app-all-categories',
  templateUrl: './all-categories.component.html',
  styleUrls: ['./all-categories.component.scss']
})
export class AllCategoriesComponent implements OnInit {
  public allCategories: CategoryModel[] = [];
  private count: number = 0;

  constructor(
    private categoryDataService: CategoryDataService,
    private title: Title
  ) {}

  ngOnInit(): void {
    AppComponent.isLoading = true;

    this.categoryDataService.categories$.subscribe((r: CategoryModel[]) => {
      if (r.length < 1 && this.count == 0) {
        this.categoryDataService.getAllCategories();
        this.count = 1;
      }

      this.allCategories = r.sort((a, b) => {
        if (a.categoryName < b.categoryName) {
          return -1;
        }
        if (a.categoryName > b.categoryName) {
          return 1;
        }
        return 0;
      });
    });

    this.title.setTitle("F1 Webshop | All Categories");

    AppComponent.isLoading = false;
  }

  public removeCategoryOutArray(event: CategoryModel): void {
    this.categoryDataService.removeCategory(event);
  }
}
