import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { CategoryModel } from 'src/app/_models/category.model';
import { ProductDataService } from 'src/app/_service/_data/productData.service';
import { BrandModel } from '../../../../_models/brand.model';
import { ProductModel } from '../../../../_models/product.model';
import { SupplierModel } from '../../../../_models/supplier.model';
import { BrandDataService } from '../../../../_service/_data/brandData.service';
import { CategoryDataService } from '../../../../_service/_data/categoryData.service';
import { SupplierDataService } from '../../../../_service/_data/supplierData.service';
import {Title} from "@angular/platform-browser";

@Component({
  selector: 'app-create-product',
  templateUrl: './create-product.component.html',
  styleUrls: ['./create-product.component.scss']
})
export class CreateProductComponent implements OnInit {
  public productCreateForm: FormGroup = new FormGroup({
    name: new FormControl('', [Validators.required]),
    price: new FormControl('', [Validators.required]),
    description: new FormControl('', [Validators.required]),
    category: new FormControl('', [Validators.required]),
    brand: new FormControl('', [Validators.required]),
    supplier: new FormControl('', [Validators.required]),
    image: new FormControl('', [Validators.required])
  });

  public brands: BrandModel[] = [];
  public currentBrand: BrandModel | undefined;

  public suppliers: SupplierModel[] = [];
  public currentSupplier: SupplierModel | undefined;

  public categories: CategoryModel[] = [];
  public currentCategory: CategoryModel | undefined;

  public images: File[] = [];

  private supplierCheck: boolean = false;
  private categoryCheck: boolean = false;
  private brandCheck: boolean = false;

  constructor(
    private supplierDataService: SupplierDataService,
    private brandDataService: BrandDataService,
    private categoryDataService: CategoryDataService,
    private productDataService: ProductDataService,
    private toastr: ToastrService,
    private title: Title
  ) {}

  ngOnInit(): void {
    this.supplierDataService.suppliers$.subscribe({
      next: (suppliers: SupplierModel[]) => {
        if (suppliers.length == 0 && this.supplierCheck == false) {
          this.supplierDataService.getAll();
          this.supplierCheck = true;
        }

        this.suppliers = suppliers;
        setTimeout(() => {
          this.productCreateForm.controls['supplier'].setValue(
            this.suppliers[0].name
          );
        }, 100);
      },
      error(e: Error) {
        throw new Error(e.message);
      },
      complete: () => {}
    });

    this.brandDataService.brands$.subscribe({
      next: (brands: BrandModel[]) => {
        if (brands.length == 0 && this.brandCheck == false) {
          this.brandDataService.getAll();
          this.brandCheck = true;
        }

        this.brands = brands;
        setTimeout(() => {
          this.productCreateForm.controls['brand'].setValue(
            this.brands[0].brandName
          );
        }, 100);
      },
      error(e: Error) {
        throw new Error(e.message);
      },
      complete: () => {}
    });

    this.categoryDataService.categories$.subscribe({
      next: (categories: CategoryModel[]) => {
        if (categories.length == 0 && this.categoryCheck == false) {
          this.categoryDataService.getAllCategories();
          this.categoryCheck = true;
        }

        this.categories = categories;
        setTimeout(() => {
          this.productCreateForm.controls['category'].setValue(
            this.categories[0].categoryName
          );
        }, 100);
      },
      error(e: Error) {
        throw new Error(e.message);
      },
      complete: () => {}
    });

    this.title.setTitle("F1 Webshop | Create Product")
  }

  public onSubmit(): void {
    const name = this.productCreateForm.controls['name'].value;
    const price: number = Number(this.productCreateForm.controls['price'].value);
    const description = this.productCreateForm.controls['description'].value;

    if (
      name == null ||
      price == null ||
      description == null ||
      this.currentSupplier == undefined ||
      this.currentBrand == undefined ||
      this.currentCategory == undefined
    ) {
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
      '',
      name,
      description,
      price,
      this.currentCategory,
      this.currentBrand,
      this.currentSupplier,
      [],
      [],
      [],
      false
    );

    this.productDataService.post(product, this.images);
  }

  public addImage(event: any): void {
    this.images.push(event.target.files[0]);
  }

  public addCategory(): void {
    const categoryToAdd = this.productCreateForm.controls['category'].value;

    this.categories.forEach((category) => {
      if (category.categoryName == categoryToAdd) {
        this.currentCategory = category;
      }
    });
  }

  public addBrand(): void {
    const brandToAdd = this.productCreateForm.controls['brand'].value;

    this.brands.forEach((brand) => {
      if (brand.brandName == brandToAdd) {
        this.currentBrand = brand;
      }
    });
  }

  public addSupplier(): void {
    const supplierToAdd = this.productCreateForm.controls['supplier'].value;

    this.suppliers.forEach((supplier) => {
      if (supplier.name == supplierToAdd) {
        this.currentSupplier = supplier;
      }
    });
  }

  public removeCategory(event: string): void {
    this.currentCategory = undefined;
  }

  public removeBrand(event: string): void {
    this.currentBrand = undefined;
  }

  public removeSupplier(event: string): void {
    this.currentSupplier = undefined;
  }

  public removeImage(event: string): void {
    this.images.forEach((image, index) => {
      if (image.name == event) {
        this.images.splice(index, 1);
      }
    });
  }
}
