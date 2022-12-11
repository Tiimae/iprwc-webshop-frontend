import {Component, Input, OnInit} from '@angular/core';
import {BrandModel} from "../../../../../_models/brand.model";

@Component({
  selector: 'app-brand',
  templateUrl: './brand.component.html',
  styleUrls: ['./brand.component.scss']
})
export class BrandComponent implements OnInit {

  @Input() brand!: BrandModel;
  constructor() { }

  ngOnInit(): void {
  }

  public removeUser() : void {

  }

}
