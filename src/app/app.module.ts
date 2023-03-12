import {APP_INITIALIZER, NgModule} from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';

import {HttpClientModule} from '@angular/common/http';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { ToastrModule } from 'ngx-toastr';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { AuthModule } from './auth/auth.module';
import { DashboardComponent } from './dashboard/dashboard.component';
import { DashboardModule } from './dashboard/dashboard.module';
import { NavigationComponent } from './navigation/navigation.component';
import { SearchbarComponent } from './navigation/searchbar/searchbar.component';
import { PageNotFoundComponent } from './page-not-found/page-not-found.component';
import { WebshopModule } from './webshop/webshop.module';
import { SharedModule } from './_shared/shared.module';
import axios from "axios";
import {ApiConnectorService} from "./_service/_api/api-connector.service";

export function initializeApp() :Promise<any> {
  return axios.get(ApiConnectorService.apiUrl + "csrf").then(res => {
    ApiConnectorService.xsrfToken = res.data.token
    return res.data.token
  })
}

@NgModule({
  declarations: [
    AppComponent,
    NavigationComponent,
    SearchbarComponent,
    PageNotFoundComponent,
    DashboardComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,
    FontAwesomeModule,
    DashboardModule,
    AuthModule,
    WebshopModule,
    BrowserAnimationsModule,
    SharedModule,
    ToastrModule.forRoot()
  ],
  providers: [
    {
      provide: APP_INITIALIZER,
      useFactory: () => initializeApp(),
      multi: false,
    },
  ],
  bootstrap: [AppComponent]
})
export class AppModule {}
