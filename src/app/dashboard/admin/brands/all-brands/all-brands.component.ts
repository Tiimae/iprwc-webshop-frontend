import { Component, OnInit } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { AppComponent } from '../../../../app.component';
import { BrandModel } from '../../../../_models/brand.model';
import { BrandDataService } from '../../../../_service/_data/brandData.service';

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
    private toastr: ToastrService
  ) {}

  async ngOnInit(): Promise<void> {
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

    AppComponent.isLoading = false;
  }

  public removeUser(event: BrandModel): void {
    this.brandDataService.remove(event);
    this.toastr.success('Brand has been deleted successfully!', 'Deleted');
  }
}
