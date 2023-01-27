import {Component} from '@angular/core';

@Component({
  selector: 'app-loading-spinner',
  template:
    '<div class="loading-overlay"><div class="lds-ellipsis"><div></div><div></div><div></div><div></div></div></div>',
  styleUrls: ['./loading-spinner.component.scss'],
})
export class LoadingSpinnerComponent {}
