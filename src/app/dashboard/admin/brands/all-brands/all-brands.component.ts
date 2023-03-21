import {Component, OnInit} from '@angular/core';
import {AppComponent} from '../../../../app.component';
import {BrandModel} from '../../../../_models/brand.model';
import {BrandDataService} from '../../../../_service/_data/brandData.service';
import {Title} from "@angular/platform-browser";

@Component({
  selector: 'app-all-brands',
  templateUrl: './all-brands.component.html',
  styleUrls: ['./all-brands.component.scss']
})
export class AllBrandsComponent implements OnInit {
  public brands: BrandModel[] = [];
  private count: number = 0;

  constructor(
    private brandDataService: BrandDataService,
    private title: Title
  ) {}

  ngOnInit(): void {
    AppComponent.isLoading = true;

    this.brandDataService.brands$.subscribe((r) => {
      if (r.length < 1 && this.count == 0) {
        this.brandDataService.getAll();
        this.count = 1;
      }

      this.brands = r.sort((a, b) => {
        if (a.brandName < b.brandName) {
          return -1;
        }
        if (a.brandName > b.brandName) {
          return 1;
        }
        return 0;
      });
    });

    this.title.setTitle("F1 Webshop | All Brands")

    AppComponent.isLoading = false;
  }

  public removeUser(event: BrandModel): void {
    this.brandDataService.remove(event);
  }
}
