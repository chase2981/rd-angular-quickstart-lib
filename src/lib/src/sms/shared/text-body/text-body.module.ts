import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { CharacterCounterDirective } from './character-counter.directive';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
  ],
  declarations: [
    CharacterCounterDirective,
  ],
  exports: [
    CharacterCounterDirective,
    FormsModule,
  ]
})
export class TextBodyModule { }
