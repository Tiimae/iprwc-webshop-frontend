import {Injectable} from "@angular/core";
import {ApiMethodsService} from "../api-methods.service";
import {BehaviorSubject, Observable, of, Subject} from "rxjs";
import {CategoryModel} from "../../_models/category.model";

@Injectable({
  providedIn: 'root',
})
export class CategoryDataService {
  categories: CategoryModel[] = [];
  categories$: Subject<CategoryModel[]> = new BehaviorSubject<CategoryModel[]>([]);

  constructor(
    private apiMethod: ApiMethodsService
  ) {
    this.getAllCategories();
  }

  public async getAllCategories(): Promise<void> {
    await ApiMethodsService.getInstance().get('category', true).then(r => {
      this.categories = r.data.payload
      this.categories$.next(this.categories)
    });
  }

  public removeCategory(category: CategoryModel) {
    this.categories.forEach((currentUser, index) => {
      if (currentUser.id == category.id) {
        this.categories.splice(index, 1)
      }
    })

    ApiMethodsService.getInstance().delete("category/" + category.id, true).then(r => {
      this.categories$.next(this.categories)
    })
  }

  public createCategory(category: CategoryModel) {
    const payload = {
      "categoryName": category.categoryName,
      "productIds": []
    }

    ApiMethodsService.getInstance().post("category", payload, true).then(r => {
      this.categories.push(r.data.payload);
      this.categories$.next(this.categories)
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
      this.categories$.next(this.categories)
    })
  }
}
