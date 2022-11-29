import {NgModule} from '@angular/core';
import {BrowserModule} from '@angular/platform-browser';
import {FontAwesomeModule} from '@fortawesome/angular-fontawesome';

import {AppRoutingModule} from './app-routing.module';
import {AppComponent} from './app.component';
import {NavigationComponent} from './navigation/navigation.component';
import {SearchbarComponent} from './navigation/searchbar/searchbar.component';
import {NavitemsComponent} from './navigation/navitems/navitems.component';
import {FormsModule} from "@angular/forms";
import {HttpClientModule} from "@angular/common/http";
import {PageNotFoundComponent} from './page-not-found/page-not-found.component';
import {DashboardComponent} from './dashboard/dashboard.component';
import {DashboardModule} from "./dashboard/dashboard.module";
import {AuthModule} from "./auth/auth.module";
import {WebshopModule} from "./webshop/webshop.module";

@NgModule({
  declarations: [
    AppComponent,
    NavigationComponent,
    SearchbarComponent,
    NavitemsComponent,
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
    WebshopModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule {
}
