import { Directive, EventEmitter, Output, OnInit, OnChanges, Input, SimpleChange, SimpleChanges } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { Observable, Subscription } from 'rxjs/Rx';

import {
  CoreApiSelector, CoreApiService, ImmutableService, TextMsgItApiService,
  CoreApiSelectorParams
} from '../../shared';

import { Account } from '../account';
import { Sms } from '../sms';
import { SmsDirective } from '../sms.directive';
import { TimezoneService } from '../../datetime';
import { SmsQueue } from './sms-queue';

declare var moment;

@Directive({
  selector: '[rdSmsQueue]',
  exportAs: 'rdSmsQueue'
})
export class SmsQueueDirective implements OnInit, OnChanges {
  @Input() id: number;
  @Input() forceSend: boolean;
  @Input() sms: Sms;
  @Input() sendDateTime: any;
  @Input() utcSendDateTime?: string;
  @Output() afterEnqueue: EventEmitter<any> = new EventEmitter<any>();

  endpoint: string = '/smsQueues';
  errorMessage?: any;
  isQueued: boolean = false;

  get model(): SmsQueue {
    return {
      sendDateTime: this.utcSendDateTime || this.sendDateTime,
      sms: {
        toNumber: this.sms.toNumber,
        fromNumber: this.sms.fromNumber,
        message: this.sms.message,
        accountId: this.sms.accountId
      },
      forceSend: this.forceSend
    };
  }

  constructor(private coreApiSvc: CoreApiService, immutable: ImmutableService,
    private txtApi: TextMsgItApiService, public timezoneSvc: TimezoneService) {

  }

  ngOnInit() {

  }

  ngOnChanges(newVal: SimpleChanges) {

  }

  getUtcOffsetSendDateTime() {
    if (this.sms && this.sms.accountId && this.sendDateTime)
      this.timezoneSvc.getUtcOffset(this.sms.accountId, this.sendDateTime).map((customUtcMoment) => {
        return customUtcMoment.toISOString();
      });
  }

  getSelector() {
    return new CoreApiSelector({
      endpoint: this.endpoint,
      include: ['sms']
    });
  }

  get(params?: CoreApiSelectorParams) {
    let selector = new CoreApiSelector({
      endpoint: this.endpoint,
      filters: params.filters,
      include: params.include,
      page: params.page,
      pageSize: params.pageSize,
      orderBy: params.orderBy
    });
    return this.txtApi.get(selector.stringify());
  }

  post(body: SmsQueue) {
    if (!body)
      throw Error('post body not provided to smsQueue directive');

    return this.txtApi.post(this.endpoint, body);
  }

  save() {
    this.post(this.model).subscribe(result => {
      this.afterEnqueue.emit(result);
    })
  }
}
