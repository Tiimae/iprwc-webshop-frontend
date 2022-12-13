import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { BubbleTextComponent } from './bubble-text/bubble-text.component';
import { ShowUploadedImageComponent } from './show-uploaded-image/show-uploaded-image.component';
import { AddEntityBarComponent } from './add-entity-bar/add-entity-bar.component';



@NgModule({
  declarations: [
    BubbleTextComponent,
    ShowUploadedImageComponent,
    AddEntityBarComponent
  ],
  exports: [
    BubbleTextComponent,
    ShowUploadedImageComponent,
    AddEntityBarComponent
  ],
  imports: [
    CommonModule
  ]
})
export class SharedModule { }
