import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {SupplierModel} from '../../../../../_models/supplier.model';
import {ApiConnectorService} from '../../../../../_service/_api/api-connector.service';

@Component({
  selector: 'app-supplier',
  templateUrl: './supplier.component.html',
  styleUrls: ['./supplier.component.scss']
})
export class SupplierComponent implements OnInit {
  @Input() public  supplier!: SupplierModel;

  public supplierId: string | undefined;

  @Output() public delete: EventEmitter<SupplierModel> = new EventEmitter();

  constructor(private api: ApiConnectorService) {}

  ngOnInit(): void {
    this.checkIfIdIsUndefined();
  }

  public async checkIfIdIsUndefined(): Promise<void> {
    this.supplierId = this.supplier.id
  }

  public removeSupplier(): void {
    this.delete.emit(this.supplier);
  }
}
