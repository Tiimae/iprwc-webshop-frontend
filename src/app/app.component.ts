import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'iprwc-webshop';
  static isLoading: boolean = false;

  public static decryptKey: string | null = null;

  getIsLoading() {
    return AppComponent.isLoading;
  }
}
