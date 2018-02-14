import { Directive, Input, Output, EventEmitter } from '@angular/core';
import { Observable, Subscription } from 'rxjs/Rx';

import { CoreApiSelector, CoreApiSelectorParams, TextMsgItApiService } from '../../shared';

@Directive({
  selector: '[rdSmsPhone]',
  exportAs: 'rdSmsPhone'
})
export class SmsPhoneDirective {
  @Input() number;

  endpoint: string = '/phones';

  constructor(private textApi: TextMsgItApiService) { }

  ngOnInit() {
  }

  getSelector(){
    return new CoreApiSelector({
      endpoint: this.endpoint,
      include: ['account']
    });
  }

  get(selector: CoreApiSelector) {
    return this.textApi.get(selector.stringify());
  }

  getPhone(number:string) {
    let selector = this.getSelector();
    selector.filters = {
      number: number
    };
    return this.textApi.get(selector.stringify());
  }

}
