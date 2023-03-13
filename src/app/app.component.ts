import {Component} from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  public static isLoading: boolean = false;
  public static hasRole: boolean | null = null;
  public static verified: boolean | null = null;

  getIsLoading() {
    return AppComponent.isLoading;
  }

}
