import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { BubbleTextComponent } from './bubble-text/bubble-text.component';
import { AddEntityBarComponent } from './add-entity-bar/add-entity-bar.component';
import { BreadcrumbComponent } from './breadcrumb/breadcrumb.component';
import { RouterLinkWithHref } from '@angular/router';
import { LoadingSpinnerComponent } from './loading-spinner/loading-spinner.component';

@NgModule({
  declarations: [
    BubbleTextComponent,
    AddEntityBarComponent,
    BreadcrumbComponent,
    LoadingSpinnerComponent
  ],
  exports: [
    BubbleTextComponent,
    AddEntityBarComponent,
    BreadcrumbComponent,
    LoadingSpinnerComponent
  ],
  imports: [CommonModule, RouterLinkWithHref]
})
export class SharedModule {}
