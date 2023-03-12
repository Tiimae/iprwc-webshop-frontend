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
  public static pageDecryptKey: string = "eea7c8e7-c6fc-4670-bd47-a416d7531ef3";

  getIsLoading() {
    return AppComponent.isLoading;
  }

}
