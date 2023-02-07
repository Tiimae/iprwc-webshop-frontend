import { Injectable } from '@angular/core';
import { AxiosResponse } from 'axios';
import { ToastrService } from 'ngx-toastr';
import { BehaviorSubject, Observable, of, Subject } from 'rxjs';
import { CategoryModel } from '../../_models/category.model';
import { ApiMethodsService } from '../_api/api-methods.service';

@Injectable({
  providedIn: 'root'
})
export class CategoryDataService {
  private categories: CategoryModel[] = [];
  public categories$: Subject<CategoryModel[]> = new BehaviorSubject<
    CategoryModel[]
  >([]);

  constructor(
    private apiMethod: ApiMethodsService,
    private toastr: ToastrService
  ) {}

  public getCurrentCategory(
    categoryId: string
  ): Observable<CategoryModel | undefined> {
    if (this.categories.length != 0) {
      return of(
        <CategoryModel>(
          this.categories.find((category) => category.id === categoryId)
        )
      );
    }

    return of(undefined);
  }

  public async getCategoryByRequest(
    categoryId: string
  ): Promise<AxiosResponse> {
    return await this.apiMethod.get('category/' + categoryId, true);
  }

  public async getAllCategories(): Promise<void> {
    await this.apiMethod.get('category', false).then((r: AxiosResponse) => {
      this.categories = r.data.payload;
      this.categories$.next(this.categories);
    });
  }

  public removeCategory(category: CategoryModel) {
    this.categories.forEach((currentUser, index) => {
      if (currentUser.id == category.id) {
        this.categories.splice(index, 1);
      }
    });

    this.apiMethod
      .delete('category/' + category.id, true)
      .then((r: AxiosResponse) => {
        this.categories$.next(this.categories);
      });
  }

  public createCategory(category: CategoryModel): boolean {
    let check = true;

    this.categories.forEach((currentCategory: CategoryModel) => {
      if (category.categoryName === currentCategory.categoryName) {
        this.toastr.error('Category name is already in user.', 'Failed');
        check = false;
      }
    });

    if (!check) {
      return check;
    }

    const payload = {
      categoryName: category.categoryName,
      productIds: []
    };

    this.apiMethod.post('category', payload, true).then((r: AxiosResponse) => {
      this.categories.push(r.data.payload);
      this.categories$.next(this.categories);
    });

    return check;
  }

  public updateCategory(category: CategoryModel): boolean {
    let check = true;

    this.categories.forEach((currentCategory: CategoryModel) => {
      if (
        category.categoryName === currentCategory.categoryName &&
        currentCategory.id !== category.id
      ) {
        this.toastr.error('Category name is already in categories.', 'Failed');
        check = false;
      }
    });

    if (!check) {
      return check;
    }

    const payload = {
      categoryName: category.categoryName,
      productIds: []
    };

    this.apiMethod
      .put('category/' + category.id, payload, true)
      .then((r: AxiosResponse) => {
        this.categories[
          this.categories.findIndex(
            (currentCategory) => currentCategory.id === category.id
          )
        ] = category;
        this.categories$.next(this.categories);
      });
    return check;
  }
}
