import { Directive, Input, Output, EventEmitter } from '@angular/core';

import { Sms } from './sms';

@Directive({
  selector: '[rdSms]',
  exportAs: 'rdSms'
})
export class SmsDirective implements Sms {
  @Input() id: number = null;
  @Input() accountId: number = null;
  @Input() toNumber: string = null;
  @Input() fromNumber: string = null;
  @Input() message: string = null;

  constructor() { }

  isValid(){
    return this.accountId && this.toNumber && this.fromNumber && this.message;
  }
}
