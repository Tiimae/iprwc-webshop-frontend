import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {CategoryModel} from 'src/app/_models/category.model';
import {ApiConnectorService} from '../../../../../_service/_api/api-connector.service';

@Component({
  selector: 'app-category',
  templateUrl: './category.component.html',
  styleUrls: ['./category.component.scss']
})
export class CategoryComponent implements OnInit {
  categoryId: string = '';

  @Input() category!: CategoryModel;

  @Output() delete: EventEmitter<CategoryModel> = new EventEmitter();

  constructor(private api: ApiConnectorService) {}

  async ngOnInit(): Promise<void> {
    this.categoryId = this.category?.id;
  }

  removeCategory(): void {
    this.delete.emit(this.category);
  }
}
