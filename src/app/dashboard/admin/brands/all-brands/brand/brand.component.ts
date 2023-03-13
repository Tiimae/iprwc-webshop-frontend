import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {BrandModel} from '../../../../../_models/brand.model';
import {ApiConnectorService} from '../../../../../_service/_api/api-connector.service';

@Component({
  selector: 'app-brand',
  templateUrl: './brand.component.html',
  styleUrls: ['./brand.component.scss']
})
export class BrandComponent implements OnInit {
  @Input() public brand!: BrandModel;
  @Output() private delete: EventEmitter<BrandModel> = new EventEmitter<BrandModel>();

  public brandId!: string;

  constructor(private api: ApiConnectorService) {}

  ngOnInit(): void {
    this.checkIfIdIsUndefined();
  }

  public removeUser(): void {
    this.delete.emit(this.brand);
  }

  public async checkIfIdIsUndefined(): Promise<void> {
    this.brandId = this.brand.id;
  }
}
