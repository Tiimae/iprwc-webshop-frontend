import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {ActivatedRoute, Router} from '@angular/router';
import { CategoryModel } from 'src/app/_models/category.model';
import {ApiMethodsService} from "../../../../_service/api-methods.service";
import * as CryptoJs from "crypto-js";
import {ApiConnectorService} from "../../../../_service/api-connector.service";

@Component({
  selector: 'app-category',
  templateUrl: './category.component.html',
  styleUrls: ['./category.component.scss']
})
export class CategoryComponent implements OnInit {

  categoryId: string | null = null

  @Input() category: CategoryModel | undefined;

  @Output() delete: EventEmitter<CategoryModel> = new EventEmitter();

  constructor() { }

  ngOnInit(): void {
    // @ts-ignore
    let encryptedId: string = CryptoJs.Rabbit.encrypt(this.category?.id, ApiConnectorService.getInstance().decryptKey)
    this.categoryId = encryptedId.toString().replace(new RegExp("/", "g"), "*");
  }

  removeCategory(): void {
    ApiMethodsService.getInstance().delete("category/" + this.category?.id, true).then(r => {
      alert("Category has been deleted")
      // @ts-ignore
      this.delete.emit(this.user);
    })
  }

  hashCategoryId(): void {

  }

}
