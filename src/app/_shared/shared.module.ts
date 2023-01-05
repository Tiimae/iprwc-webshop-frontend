import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {BubbleTextComponent} from './bubble-text/bubble-text.component';
import {AddEntityBarComponent} from './add-entity-bar/add-entity-bar.component';
import { BreadcrumbComponent } from './breadcrumb/breadcrumb.component';
import {RouterLinkWithHref} from "@angular/router";


@NgModule({
  declarations: [
    BubbleTextComponent,
    AddEntityBarComponent,
    BreadcrumbComponent
  ],
  exports: [
    BubbleTextComponent,
    AddEntityBarComponent,
    BreadcrumbComponent
  ],
  imports: [
    CommonModule,
    RouterLinkWithHref
  ]
})
export class SharedModule { }
