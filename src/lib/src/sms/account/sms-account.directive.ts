import { Directive, Input, Output, EventEmitter } from '@angular/core';
import { Observable, Subscription } from 'rxjs/Rx';

import { CoreApiSelector, TextMsgItApiService } from '../../shared';

import { Account } from './account';
import { ApiDirective } from '../shared';

@Directive({
  selector: '[rdSmsAccount]',
  exportAs: 'rdSmsAccount'
})
export class SmsAccountDirective implements ApiDirective {
  @Input() subscribe: boolean = false;

  endpoint: string = '/accounts';
  result: any[] = [];

  constructor(private textApi: TextMsgItApiService) { }

  ngOnInit(){
    if(this.subscribe)
      this.getAccounts();
  }

  getSelector(){
    return new CoreApiSelector({
      endpoint: this.endpoint
    });
  }

  get(selector: CoreApiSelector){
    return this.textApi.get(selector.stringify());
  }

  getAccounts(){
    let selector = this.getSelector();
    this.get(this.getSelector()).subscribe(result => {
      this.result = result;
    });
  }

}
