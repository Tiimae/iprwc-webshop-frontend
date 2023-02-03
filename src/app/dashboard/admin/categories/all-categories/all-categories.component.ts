import { Component, OnInit } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { CategoryModel } from 'src/app/_models/category.model';
import { AppComponent } from '../../../../app.component';
import { CategoryDataService } from '../../../../_service/data/categoryData.service';

@Component({
  selector: 'app-all-categories',
  templateUrl: './all-categories.component.html',
  styleUrls: ['./all-categories.component.scss']
})
export class AllCategoriesComponent implements OnInit {
  allCategories: CategoryModel[] = [];
  private count: number = 0;

  constructor(
    private categoryDataService: CategoryDataService,
    private toastr: ToastrService
  ) {}

  async ngOnInit(): Promise<void> {
    AppComponent.isLoading = true;

    this.categoryDataService.categories$.subscribe((r) => {
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

    AppComponent.isLoading = false;
  }

  removeCategoryOutArray(event: CategoryModel): void {
    this.categoryDataService.removeCategory(event);
    this.toastr.success('Category has been deleted successfully!', 'Deleted');
  }
}
