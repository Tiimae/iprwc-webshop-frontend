import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';

@Component({
  selector: 'app-add-entity-bar',
  templateUrl: './add-entity-bar.component.html',
  styleUrls: ['./add-entity-bar.component.scss']
})
export class AddEntityBarComponent implements OnInit {

  @Input() name!: string;
  @Output() delete: EventEmitter<string> = new EventEmitter()

  constructor() { }

  ngOnInit(): void {
  }

  remove() {
    this.delete.emit(this.name)
  }

}
