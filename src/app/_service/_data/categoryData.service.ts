import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
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
    private toastr: ToastrService,
    private router: Router
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

  public createCategory(category: CategoryModel): void {
    const payload = {
      categoryName: category.categoryName,
      productIds: []
    };

    this.apiMethod
      .post('category', payload, true)
      .then((res: AxiosResponse) => {
        if (res.data.code === 202) {
          this.categories.push(res.data.payload);
          this.categories$.next(this.categories);

          this.toastr.success(
            'Brand Has been created successfully!',
            'Created'
          );
          this.router.navigate(['dashboard', 'admin', 'categories']);
        } else if (res.data.code === 400) {
          this.toastr.error(res.data.message, res.data.code);
        }
      });
  }

  public updateCategory(category: CategoryModel): void {
    const payload = {
      categoryName: category.categoryName,
      productIds: []
    };

    this.apiMethod
      .put('category/' + category.id, payload, true)
      .then((res: AxiosResponse) => {
        if (res.data.code === 202) {
          this.categories[
            this.categories.findIndex(
              (currentCategory) => currentCategory.id === category.id
            )
          ] = category;
          this.categories$.next(this.categories);
          this.toastr.success(
            'Brand Has been updated successfully!',
            'Updated'
          );
          this.router.navigate(['dashboard', 'admin', 'categories']);
        } else if (res.data.code === 400) {
          this.toastr.error(res.data.message, res.data.code);
        }
      });
  }

  public removeCategory(category: CategoryModel) {
    this.apiMethod
      .delete('category/' + category.id, true)
      .then((res: AxiosResponse) => {
        if (res.data.code === 202) {
          this.categories.forEach((currentUser, index) => {
            if (currentUser.id == category.id) {
              this.categories.splice(index, 1);
            }
          });
          this.categories$.next(this.categories);
          this.toastr.success(
            'Category has been deleted successfully!',
            'Deleted'
          );
        } else if (res.data.code === 400) {
          this.toastr.error(res.data.message, res.data.code);
        }
      });
  }
}
