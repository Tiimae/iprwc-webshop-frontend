import {Injectable} from "@angular/core";
import {ApiMethodsService} from "../api-methods.service";
import {Observable, of} from "rxjs";
import {CategoryModel} from "../../_models/category.model";

@Injectable({
  providedIn: 'root',
})
export class CategoryDataService {
  categories: CategoryModel[] = [];

  private static instance: CategoryDataService;

  constructor(
    private apiMethod: ApiMethodsService
  ) {
    this.setAllNewCategories();
  }

  public static getInstance(): CategoryDataService  {
    if (CategoryDataService.instance == undefined) {
      CategoryDataService.instance = new CategoryDataService(new ApiMethodsService());
    }

    return CategoryDataService.instance;
  }

  public async setAllNewCategories(): Promise<void> {
    this.apiMethod.get('category', true).then(r => {
      r.data.payload.forEach((category: CategoryModel) => {
        this.categories.push(category);
      });
    });
  }

  public getAllCategories(): Observable<CategoryModel[]> {
    return of(this.categories);
  }

  public removeCategory(category: CategoryModel) {
    this.categories.forEach((currentUser, index) => {
      if (currentUser.id == category.id) {
        this.categories.splice(index, 1)
      }
    })

    this.apiMethod.delete("category/" + category.id, true).then(r => {
      alert("Category has been deleted")
    })
  }
}
