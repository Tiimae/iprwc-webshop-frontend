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
    ApiMethodsService.getInstance().get('category', true).then(r => {
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

    ApiMethodsService.getInstance().delete("category/" + category.id, true).then(r => {
      alert("Category has been deleted")
    })
  }

  public createCategory(category: CategoryModel) {
    const payload = {
      "categoryName": category.categoryName,
      "productIds": []
    }

    ApiMethodsService.getInstance().post("category", payload, true).then(r => {
      this.categories.push(r.data.payload);
    })
  }

  public getCurrentCategory(categoryId: string): Observable<CategoryModel | undefined> {
    if (this.categories.length != 0) {
      return of(<CategoryModel>this.categories.find(category => category.id === categoryId));
    }

    return of(undefined);
  }

  public updateCategory(category: CategoryModel): void {
    const payload = {
      "categoryName": category.categoryName,
      "productIds": []
    }

    ApiMethodsService.getInstance().put("category/" + category.id, payload, true).then(r => {
      this.categories[this.categories.findIndex(currentCategory => currentCategory.id === category.id)] = category
    })
  }
}
