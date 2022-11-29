import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';

import {WebshopRoutingModule} from './webshop-routing.module';
import {WebshopComponent} from "./webshop.component";
import {HomeComponent} from "./home/home.component";


@NgModule({
  declarations: [
    WebshopComponent,
    HomeComponent
  ],
  imports: [
    CommonModule,
    WebshopRoutingModule
  ]
})
export class WebshopModule { }
