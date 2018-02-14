import { Directive, Input, Output, EventEmitter, OnInit } from '@angular/core';

import { TextMsgItApiService } from '../../../shared';

import { SmsQueueModel } from '../../queue';
import { SmsQueueModelDirective } from './sms-queue-model.directive';

@Directive({
  selector: '[rdSmsQueueDataLayer]',
  exportAs: 'rdSmsQueueDataLayer'
})
export class SmsQueueDataLayerDirective implements OnInit {

  enqueueAll: EventEmitter<any> = new EventEmitter<any>();
  models: SmsQueueModel[] = [];

  constructor(private textApi: TextMsgItApiService) { }

  ngOnInit() {
    this.models.push(new SmsQueueModel());
  }

}
