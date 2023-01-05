import {Component, Input, OnInit} from '@angular/core';

@Component({
  selector: 'app-bubble-text',
  template: '' +
    '<section class="bg-teal-200 rounded-full text-teal-600 mr-5">\n' +
    '  <p class="p-1 text-sm">\n' +
    '    {{ key }}:\n' +
    '    <strong>{{ value }} </strong>\n' +
    '  </p>\n' +
    '</section>'
})
export class BubbleTextComponent implements OnInit {

  @Input() key!: any
  @Input() value!: any
  constructor() { }

  ngOnInit(): void {
  }

}
