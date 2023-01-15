import {Component, OnInit} from '@angular/core';
import {BrandModel} from "../../../../_models/brand.model";
import {BrandDataService} from "../../../../_service/data/brandData.service";
import {ToastrService} from "ngx-toastr";
import {AppComponent} from "../../../../app.component";

@Component({
  selector: 'app-all-brands',
  templateUrl: './all-brands.component.html',
  styleUrls: ['./all-brands.component.scss']
})
export class AllBrandsComponent implements OnInit {

  brands: BrandModel[] = []

  constructor(
    private brandDataService: BrandDataService,
    private toastr: ToastrService
  ) {
  }

  async ngOnInit(): Promise<void> {
    AppComponent.isLoading = true;

    this.brandDataService
      .brands$
      .subscribe(r => {
        this.brands = r.sort((a, b) => {
          if (a.brandName < b.brandName) {
            return -1;
          }
          if (a.brandName > b.brandName) {
            return 1;
          }
          return 0;
        })
      })

    AppComponent.isLoading = false;
  }

  public removeUser(event: BrandModel): void {
    this.brandDataService.remove(event);
    this.toastr.success("Brand has been deleted successfully!", "Deleted")
  }

}
