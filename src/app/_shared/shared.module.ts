import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { BubbleTextComponent } from './bubble-text/bubble-text.component';
import { AddEntityBarComponent } from './add-entity-bar/add-entity-bar.component';



@NgModule({
  declarations: [
    BubbleTextComponent,
    AddEntityBarComponent
  ],
  exports: [
    BubbleTextComponent,
    AddEntityBarComponent
  ],
  imports: [
    CommonModule
  ]
})
export class SharedModule { }
