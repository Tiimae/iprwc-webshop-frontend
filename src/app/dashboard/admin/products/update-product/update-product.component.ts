import {Component, OnInit} from '@angular/core';
import {FormControl, FormGroup, Validators} from "@angular/forms";
import {BrandModel} from "../../../../_models/brand.model";
import {SupplierModel} from "../../../../_models/supplier.model";
import {CategoryModel} from "../../../../_models/category.model";
import {SupplierDataService} from "../../../../_service/data/supplierData.service";
import {BrandDataService} from "../../../../_service/data/brandData.service";
import {CategoryDataService} from "../../../../_service/data/categoryData.service";
import {ProductDataService} from "../../../../_service/data/productData.service";
import {ActivatedRoute, Router} from "@angular/router";
import * as CryptoJs from "crypto-js";
import {ApiConnectorService} from "../../../../_service/api-connector.service";
import {ProductModel} from 'src/app/_models/product.model';
import {ProductImageModel} from "../../../../_models/productImage.model";

@Component({
  selector: 'app-update-product',
  templateUrl: './update-product.component.html',
  styleUrls: ['./update-product.component.scss']
})
export class UpdateProductComponent implements OnInit {

  productCreateForm = new FormGroup({
    name: new FormControl('', [Validators.required]),
    price: new FormControl('', [Validators.required]),
    description: new FormControl('', [Validators.required]),
    category: new FormControl('', [Validators.required]),
    brand: new FormControl('', [Validators.required]),
    supplier: new FormControl('', [Validators.required]),
    image: new FormControl('', []),
  })

  productId!: string;
  product!: ProductModel;

  brands: BrandModel[] = []
  currentBrand: BrandModel | undefined;

  suppliers: SupplierModel[] = [];
  currentSupplier: SupplierModel | undefined;

  categories: CategoryModel[] = []
  currentCategory: CategoryModel | undefined;

  images: ProductImageModel[] = [];
  deleteImages: ProductImageModel[] = [];
  addedImages: File[] = []

  constructor(
    private supplierDataService: SupplierDataService,
    private brandDataService: BrandDataService,
    private categoryDataService: CategoryDataService,
    private productDataService: ProductDataService,
    private router: Router,
    private route: ActivatedRoute,
  ) { }

  ngOnInit(): void {

    this.route.params.subscribe(async (params) => {
      const currentProductId = params['productId'].replaceAll("*", "/");
      this.productId = CryptoJs.Rabbit.decrypt(currentProductId, await ApiConnectorService.getInstance().getDecryptKey()).toString(CryptoJs.enc.Utf8)

      this.productDataService
        .get(this.productId)
        .subscribe(res => {
          if (res == undefined) {
            this.router.navigate(["dashboard", "admin", "products"])
            return;
          }

          this.product = res;

          this.currentBrand = this.product.brand;
          this.currentCategory = this.product.category;
          this.currentSupplier = this.product.supplier;
          this.images = this.product.productImages;

          this.productCreateForm.controls.name.setValue(this.product.productName)
          this.productCreateForm.controls.price.setValue(this.product.price)
          this.productCreateForm.controls.description.setValue(this.product.description)
        })

    })

    this.supplierDataService
      .suppliers$
      .subscribe({
        next: (suppliers: SupplierModel[]) => {
          this.suppliers = suppliers;
          setTimeout(() => {
            this.productCreateForm.controls.supplier.setValue(this.suppliers[0].name)
          }, 100)
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
          setTimeout(() => {
            this.productCreateForm.controls.brand.setValue(this.brands[0].brandName);
          }, 100)
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
          setTimeout(() => {
            this.productCreateForm.controls.category.setValue(this.categories[0].categoryName)
          }, 100)
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
    const price = this.productCreateForm.controls.price.value;
    const description = this.productCreateForm.controls.description.value;

    if (name == null || price == null || description == null || this.currentSupplier == undefined || this.currentBrand == undefined || this.currentCategory == undefined || this.images.length == 0) {
      return;
    }

    if (!this.productCreateForm.valid) {
      return;
    }

    const product = new ProductModel(
      this.product.id,
      name,
      description,
      price,
      this.currentCategory,
      this.currentBrand,
      this.currentSupplier,
      []
    );

    this.productDataService.update(product, this.deleteImages, this.addedImages);
    this.router.navigate(["dashboard", "admin", "products"]);
  }

  addImage(event: any): void {
    this.addedImages.push(event.target.files[0]);
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

  removeExistingImage(event: string): void {
    this.images.forEach((image, index) => {
      if (image.imagePath === event) {
        this.deleteImages.push(image);
        this.images.splice(index, 1)
      }
    })
  }

  removeNewImage(event: string): void {
    this.addedImages.forEach((image, index) => {
      if (image.name == event) {
        this.addedImages.splice(index, 1)
      }
    })
  }

}
