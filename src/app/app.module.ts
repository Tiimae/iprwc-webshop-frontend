import {NgModule} from '@angular/core';
import {BrowserModule} from '@angular/platform-browser';
import {FontAwesomeModule} from '@fortawesome/angular-fontawesome';

import {AppRoutingModule} from './app-routing.module';
import {AppComponent} from './app.component';
import {NavigationComponent} from './navigation/navigation.component';
import {SearchbarComponent} from './navigation/searchbar/searchbar.component';
import {FormsModule} from "@angular/forms";
import {HttpClientModule} from "@angular/common/http";
import {PageNotFoundComponent} from './page-not-found/page-not-found.component';
import {DashboardComponent} from './dashboard/dashboard.component';
import {DashboardModule} from "./dashboard/dashboard.module";
import {AuthModule} from "./auth/auth.module";
import {WebshopModule} from "./webshop/webshop.module";
import {ToastrModule} from "ngx-toastr";
import {BrowserAnimationsModule} from "@angular/platform-browser/animations";
import {SharedModule} from "./_shared/shared.module";

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
    HttpClientModule,
    FontAwesomeModule,
    DashboardModule,
    AuthModule,
    WebshopModule,
    BrowserAnimationsModule,
    SharedModule,
    ToastrModule.forRoot(),
  ],
  providers: [
  ],
  bootstrap: [AppComponent]
})
export class AppModule {
}
