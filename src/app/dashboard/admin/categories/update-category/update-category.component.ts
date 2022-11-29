import {Component, OnInit, ViewChild} from '@angular/core';
import {ActivatedRoute, Router} from "@angular/router";
import {ApiConnectorService} from "../../../../_service/api-connector.service";
import * as CryptoJs from "crypto-js";
import {NgForm} from "@angular/forms";
import {ApiMethodsService} from "../../../../_service/api-methods.service";

@Component({
  selector: 'app-update-category',
  templateUrl: './update-category.component.html',
  styleUrls: ['./update-category.component.scss']
})
export class UpdateCategoryComponent implements OnInit {

  categoryId: string | null = null

  @ViewChild('f') updateForm: NgForm | undefined;

  constructor(private route: ActivatedRoute, private router: Router) {
  }

  ngOnInit(): void {
    this.route.params.subscribe((params) => {
      if (ApiConnectorService.getInstance().decryptKey != null) {
        const currentUserId = params['categoryId'].replaceAll("*", "/")

        // @ts-ignore
        this.categoryId = CryptoJs.Rabbit.decrypt(currentUserId, ApiConnectorService.getInstance().decryptKey).toString(CryptoJs.enc.Utf8)
      }

      ApiMethodsService.getInstance().get("category/" + this.categoryId, true).then(r => {
        this.updateForm?.form.controls['catname'].setValue(r.data.payload.categoryName)
      });

    })
  }

  onSubmit(): void {
    const payload = {
      categoryName: this.updateForm?.form.controls['catname'].value,
      productIds: []
    }

    ApiMethodsService.getInstance().put("category/" + this.categoryId, payload, true).then(r => {
      alert("Category has been updated");
      this.router.navigate(["dashboard", "categories"]);
    })
  }

}
