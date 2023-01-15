import {Component, OnInit} from '@angular/core';
import {CategoryModel} from 'src/app/_models/category.model';
import {CategoryDataService} from "../../../../_service/data/categoryData.service";
import {ToastrService} from "ngx-toastr";

@Component({
  selector: 'app-all-categories',
  templateUrl: './all-categories.component.html',
  styleUrls: ['./all-categories.component.scss']
})
export class AllCategoriesComponent implements OnInit {

  allCategories: CategoryModel[] = []

  constructor(
    private categoryDataService: CategoryDataService,
    private toastr: ToastrService
  ) { }

  async ngOnInit(): Promise<void> {

    this.categoryDataService
      .categories$
      .subscribe(r => {
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

  }

  removeCategoryOutArray(event: CategoryModel): void {
    this.categoryDataService.removeCategory(event)
    this.toastr.success("Category has been deleted successfully!", "Deleted")
  }

}
