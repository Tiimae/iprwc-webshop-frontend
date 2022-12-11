import {Component, OnInit} from '@angular/core';
import {BrandDataService} from "../../../../_service/data/brandData.service";
import * as CryptoJs from "crypto-js";
import {ApiConnectorService} from "../../../../_service/api-connector.service";
import {ActivatedRoute} from "@angular/router";

@Component({
  selector: 'app-update-brand',
  templateUrl: './update-brand.component.html',
  styleUrls: ['./update-brand.component.scss']
})
export class UpdateBrandComponent implements OnInit {

  imageRoute!: string;

  constructor(
    private route: ActivatedRoute,
    private brandDataService: BrandDataService
  ) { }

  ngOnInit(): void {

    this.route.params.subscribe(async (params) => {
      (await this.brandDataService
        .get(params["brandId"]))
        .subscribe(r => {
          console.log(r)
          this.imageRoute = <string> r.logoUrl
        })
    })
  }

}
