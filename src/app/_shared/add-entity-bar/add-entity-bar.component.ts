import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';

@Component({
  selector: 'app-add-entity-bar',
  templateUrl: './add-entity-bar.component.html',
  styleUrls: ['./add-entity-bar.component.scss']
})
export class AddEntityBarComponent implements OnInit {
  @Input() public name!: string;
  @Output() private delete: EventEmitter<string> = new EventEmitter();

  constructor() {}

  ngOnInit(): void {}

  public remove() {
    this.delete.emit(this.name);
  }
}
