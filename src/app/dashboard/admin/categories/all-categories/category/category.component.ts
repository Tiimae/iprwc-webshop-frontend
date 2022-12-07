import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {CategoryModel} from 'src/app/_models/category.model';
import {ApiMethodsService} from "../../../../../_service/api-methods.service";
import * as CryptoJs from "crypto-js";
import {ApiConnectorService} from "../../../../../_service/api-connector.service";

@Component({
  selector: 'app-category',
  templateUrl: './category.component.html',
  styleUrls: ['./category.component.scss']
})
export class CategoryComponent implements OnInit {

  categoryId: string = ""

  @Input() category!: CategoryModel;

  @Output() delete: EventEmitter<CategoryModel> = new EventEmitter();

  constructor() { }

  async ngOnInit(): Promise<void> {
    let encryptedId: string = CryptoJs.Rabbit.encrypt(this.category?.id, await ApiConnectorService.getInstance().getDecryptKey()).toString()
    this.categoryId = encryptedId.toString().replace(new RegExp("/", "g"), "*");
  }

  removeCategory(): void {
    this.delete.emit(this.category);
  }
}
