import { Component } from '@angular/core';
import {Title} from "@angular/platform-browser";

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  public static isLoading: boolean = false;

  public static decryptKey: string | null = null;

  getIsLoading() {
    return AppComponent.isLoading;
  }

}
