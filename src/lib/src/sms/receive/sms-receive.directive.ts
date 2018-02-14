import { Directive, EventEmitter, Output, OnInit, Input } from '@angular/core';
import { Observable, Subscription } from 'rxjs/Rx';

import { CoreApiService, CoreApiSelector, TextMsgItApiService, CoreApiSelectorParams } from '../../shared';

import { DataLayerDirective } from '../shared';

@Directive({
  selector: '[rdSmsReceive]',
  exportAs: 'rdSmsReceive'
})
export class SmsReceiveDirective extends DataLayerDirective {

  endpoint: string = '/smsReceived';

  constructor(private textApi: TextMsgItApiService) {
    super();
  }

  ngOnInit() {

  }

  ngOnChanges() {
    //todo: watch for changes to CoreApiSelector inputs and re-fetch data
  }

  get(params?: CoreApiSelectorParams) {
    let selector = this.getSelector(params);
    return this.textApi.get(selector.stringify());
  }

  post(body: any) {
    return this.textApi.post(this.endpoint, body);
  }

}
