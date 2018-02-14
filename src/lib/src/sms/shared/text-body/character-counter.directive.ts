import { Directive, Input, Output, EventEmitter, ElementRef } from '@angular/core';
import { NgModel } from '@angular/forms';

import { Header } from './shared';

@Directive({
  selector: 'input[rdCharacterCounter], textarea[rdCharacterCounter]',
  exportAs: 'rdCharacterCounter',
  providers: [
    NgModel
  ]
})
export class CharacterCounterDirective {
  @Input() headers: Header[] = [];
  @Input() restrict: boolean = true;
  @Output() result: EventEmitter<any> = new EventEmitter<any>();

  characters: number;
  input: JQuery;

  constructor(elementRef: ElementRef, private ngModel: NgModel) {
    this.input = $(elementRef.nativeElement);
  }

  ngOnInit(){

  }

  ngAfterViewInit() {
    let self = this;
    $(this.input).ready(function () {
      self.count();
    });
    $(this.input).on('keyup', function () {
      let remaining = self.count();
      if (self.restrict && remaining <= 0)
        self.restrictInput();
    });
  }

  count() {
    let self = this;
    let target = this.input;
    let initialChars: string = target.val() || '';
    let chars: string = target.val() || '';
    chars = chars.replace(/\[.+]/g, '');
    let rawLength = chars.length;
    let adjustedLength = rawLength;
    for (let header of self.headers) {
      if (initialChars.includes(`[${header.name}]`))
        adjustedLength += header.max_length;
    }

    let remaining = (160 - adjustedLength);

    this.result.emit(remaining);
    this.characters = remaining;

    // $('#counter').text(remaining);

    // if (adjustedLength > 154) {
    //   $("#counter").css("color", "#b94a48");
    //   $("#counter").css("font-weight", "bold");
    // } else {
    //   $("#counter").css("color", "#333");
    //   $("#counter").css("font-weight", "normal");
    // }

    return remaining;
  }

  restrictInput() {
    let target = $(this.input);
    let value: string = target.val();
    target.val(`${value.substr(0, 160)}`);
    target.focus();
  }

}
