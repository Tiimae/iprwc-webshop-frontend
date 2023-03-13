import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {BubbleTextComponent} from './bubble-text/bubble-text.component';
import {AddEntityBarComponent} from './add-entity-bar/add-entity-bar.component';
import {BreadcrumbComponent} from './breadcrumb/breadcrumb.component';
import {RouterLinkWithHref} from '@angular/router';
import {LoadingSpinnerComponent} from './loading-spinner/loading-spinner.component';
import {DefaultInputFieldsComponent} from './default-input-fields/default-input-fields.component';

@NgModule({
  declarations: [
    BubbleTextComponent,
    AddEntityBarComponent,
    BreadcrumbComponent,
    LoadingSpinnerComponent,
    DefaultInputFieldsComponent,
  ],
  exports: [
    BubbleTextComponent,
    AddEntityBarComponent,
    BreadcrumbComponent,
    LoadingSpinnerComponent,
    DefaultInputFieldsComponent,
  ],
  imports: [CommonModule, RouterLinkWithHref]
})
export class SharedModule {}
