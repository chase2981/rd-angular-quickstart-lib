import { Directive, EventEmitter, Input, Output, OnInit } from '@angular/core';
import { BehaviorSubject, Observable, Subscription  } from 'rxjs/Rx';

import { TextMsgItApiService, CoreApiSelector } from '../../shared';

@Directive({
  selector: '[rdSmsOptOut]',
  exportAs: 'rdSmsOptOut'
})
export class SmsOptOutDirective implements OnInit {
  @Input() id: number = null;
  @Input() accountId: string = null;
  @Input() number: string = null;

  endpoint: string = '/smsOptOuts';
  isOptedOut: boolean = false;

  constructor(private txtApi: TextMsgItApiService) {

  }

  ngOnInit() {
    if (this.accountId && this.number)
      this.get(new CoreApiSelector({
        endpoint: this.endpoint,
        filters: {
          account: this.accountId,
          number: this.number
        }
      })).subscribe(result => {
        this.isOptedOut = result.length > 0;
        if (this.isOptedOut)
          this.id = result[0].id;
      });
  }

  get(selector: CoreApiSelector) {
    return this.txtApi.get(selector.stringify());
  }

  delete() {
    return this.txtApi.delete(`${this.endpoint}/${this.id}`);
  }

  post() {
    return this.txtApi.post(this.endpoint, {
      accountId: +this.accountId,
      number: this.number
    });
  }

  optOut(newVal: boolean) {
    if (newVal)
      return this.post().subscribe(result => {
        this.isOptedOut = true;
      });
    return this.delete().subscribe();
  }

  reset() {
    this.accountId = null;
    this.number = null;
  }

}
