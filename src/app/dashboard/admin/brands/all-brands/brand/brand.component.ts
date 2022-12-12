import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {BrandModel} from "../../../../../_models/brand.model";

@Component({
  selector: 'app-brand',
  templateUrl: './brand.component.html',
  styleUrls: ['./brand.component.scss']
})
export class BrandComponent implements OnInit {

  @Input() brand!: BrandModel;
  @Output() delete: EventEmitter<BrandModel> = new EventEmitter<BrandModel>();

  constructor() { }

  ngOnInit(): void {
  }

  public removeUser() : void {
    this.delete.emit(this.brand)
  }

}
