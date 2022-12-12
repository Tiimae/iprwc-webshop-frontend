import {Component, OnInit} from '@angular/core';
import {BrandModel} from "../../../../_models/brand.model";
import {BrandDataService} from "../../../../_service/data/brandData.service";

@Component({
  selector: 'app-all-brands',
  templateUrl: './all-brands.component.html',
  styleUrls: ['./all-brands.component.scss']
})
export class AllBrandsComponent implements OnInit {

  brands: BrandModel[] = []
  constructor(
    private brandDataService: BrandDataService
  ) { }

  async ngOnInit(): Promise<void> {

    (await this.brandDataService
      .getAll())
      .subscribe(r => {
        this.brands = r
      })

    console.log(this.brands)

  }

  public removeUser(event: BrandModel): void {
    this.brandDataService.remove(event);
  }

}
