import {Component, OnInit} from '@angular/core';
import {FormControl, FormGroup, Validators} from "@angular/forms";
import {SupplierDataService} from "../../../../_service/data/supplierData.service";
import {BrandDataService} from "../../../../_service/data/brandData.service";
import {ProductDataService} from 'src/app/_service/data/productData.service';
import {CategoryDataService} from "../../../../_service/data/categoryData.service";
import {Router} from "@angular/router";
import {BrandModel} from "../../../../_models/brand.model";
import {SupplierModel} from "../../../../_models/supplier.model";
import {CategoryModel} from 'src/app/_models/category.model';
import {ProductModel} from "../../../../_models/product.model";
import {ToastrService} from "ngx-toastr";

@Component({
  selector: 'app-create-product',
  templateUrl: './create-product.component.html',
  styleUrls: ['./create-product.component.scss']
})
export class CreateProductComponent implements OnInit {

  productCreateForm = new FormGroup({
    name: new FormControl('', [Validators.required]),
    price: new FormControl('', [Validators.required]),
    description: new FormControl('', [Validators.required]),
    category: new FormControl('', [Validators.required]),
    brand: new FormControl('', [Validators.required]),
    supplier: new FormControl('', [Validators.required]),
    image: new FormControl('', [Validators.required]),
  })

  brands: BrandModel[] = []
  currentBrand: BrandModel | undefined;

  suppliers: SupplierModel[] = [];
  currentSupplier: SupplierModel | undefined;

  categories: CategoryModel[] = []
  currentCategory: CategoryModel | undefined;

  images: File[] = []

  constructor(
    private supplierDataService: SupplierDataService,
    private brandDataService: BrandDataService,
    private categoryDataService: CategoryDataService,
    private productDataService: ProductDataService,
    private router: Router,
    private toastr: ToastrService
  ) {
  }

  async ngOnInit(): Promise<void> {

    this.supplierDataService
      .suppliers$
      .subscribe({
        next: (suppliers: SupplierModel[]) => {
          this.suppliers = suppliers;
        },
        error(e: Error) {
          throw new Error(e.message)
        },
        complete: () => {
        }
      })

    this.brandDataService
      .brands$
      .subscribe({
        next: (brands: BrandModel[]) => {
          this.brands = brands;
        },
        error(e: Error) {
          throw new Error(e.message)
        },
        complete: () => {
        }
      });

    this.categoryDataService
      .categories$
      .subscribe({
        next: (categories: CategoryModel[]) => {
          this.categories = categories;
        },
        error(e: Error) {
          throw new Error(e.message)
        },
        complete: () => {
        }
      });
  }

  onSubmit(): void {
    const name = this.productCreateForm.controls.name.value;
    const price: number = Number(this.productCreateForm.controls.price.value);
    const description = this.productCreateForm.controls.description.value;

    if (name == null || price == null || description == null || this.currentSupplier == undefined || this.currentBrand == undefined || this.currentCategory == undefined || this.images.length == 0) {
      this.toastr.error('Something is wrong!', 'Failed');
      return;
    }

    if (price < 0) {
      this.toastr.error('Price is to low', 'Failed');
      return;
    }

    if (!this.productCreateForm.valid) {
      this.toastr.error('Something is wrong!', 'Failed');
      return;
    }

    const product = new ProductModel(
      "",
      name,
      description,
      price,
      this.currentCategory,
      this.currentBrand,
      this.currentSupplier,
      []
    );

    const request: boolean = this.productDataService.post(product, this.images);

    if (request) {
      this.toastr.success("Brand Has been created successfully!", "Created")
      this.router.navigate(["dashboard", "admin", "products"]);
    }

  }

  addImage(event: any): void {
    this.images.push(event.target.files[0]);
  }

  addCategory(): void {
    const categoryToAdd = this.productCreateForm.controls.category.value;

    this.categories.forEach(category => {
      if (category.categoryName == categoryToAdd) {
        this.currentCategory = category;
      }
    })
  }

  addBrand(): void {
    const brandToAdd = this.productCreateForm.controls.brand.value;

    this.brands.forEach(brand => {
      if (brand.brandName == brandToAdd) {
        this.currentBrand = brand;
      }
    })
  }

  addSupplier(): void {
    const supplierToAdd = this.productCreateForm.controls.supplier.value;

    this.suppliers.forEach(supplier => {
      if (supplier.name == supplierToAdd) {
        this.currentSupplier = supplier;
      }
    })
  }

  removeCategory(event: string): void {
    this.currentCategory = undefined;
  }

  removeBrand(event: string): void {
    this.currentBrand = undefined;
  }

  removeSupplier(event: string): void {
    this.currentSupplier = undefined;
  }

  removeImage(event: string): void {
    this.images.forEach((image, index) => {
      if (image.name == event) {
        this.images.splice(index, 1)
      }
    })
  }

}
