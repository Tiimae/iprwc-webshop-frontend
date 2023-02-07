import { Component, OnInit } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { AppComponent } from '../../../../app.component';
import { ProductModel } from '../../../../_models/product.model';
import { ProductDataService } from '../../../../_service/_data/productData.service';

@Component({
  selector: 'app-all-products',
  templateUrl: './all-products.component.html',
  styleUrls: ['./all-products.component.scss']
})
export class AllProductsComponent implements OnInit {
  allProducts: ProductModel[] = [];
  deletedProducts: ProductModel[] = [];
  showDeleted: boolean = false;

  private count: number = 0;

  constructor(
    private productDataService: ProductDataService,
    private toastr: ToastrService
  ) {}

  ngOnInit(): void {
    AppComponent.isLoading = true;

    this.productDataService.products$.subscribe({
      next: (products: ProductModel[]) => {
        if (products.length < 1 && this.count === 0) {
          this.productDataService.getAll();
          this.count++;
        }

        this.allProducts = products.sort((a, b) => {
          if (a.productName < b.productName) {
            return -1;
          }
          if (a.productName > b.productName) {
            return 1;
          }
          return 0;
        });
      },
      error(e: Error) {
        throw new Error(e.message);
      },
      complete: () => {
        console.log('complete');
      }
    });

    this.productDataService.deletedProducts$.subscribe({
      next: (products: ProductModel[]) => {
        this.deletedProducts = products;
      },
      error(e: Error) {
        throw new Error(e.message);
      },
      complete: () => {
        console.log('complete');
      }
    });
    AppComponent.isLoading = false;
  }

  removeProductOutArray(event: ProductModel): void {
    this.productDataService.delete(event.id);
    this.toastr.success('Product has been deleted successfully!', 'Deleted');
  }

  changeProducts(): void {
    this.showDeleted = !this.showDeleted;
  }

  setDeletedBack(event: ProductModel) {
    this.productDataService.restore(event.id);
    this.toastr.success('Product has been restored successfully!', 'Deleted');
  }
}
