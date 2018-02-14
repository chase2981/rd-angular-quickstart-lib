import { Directive, Input, Output, EventEmitter, OnInit } from '@angular/core';
import { Observable, Subscription } from 'rxjs/Rx';

import { TextMsgItApiService } from '../../../shared';
import { Toast } from '../../../../common';

import { Sms } from '../../sms';
import { SmsModel } from '../../sms.model';

@Directive({
  selector: '[rdSmsQueueModel]'
})
export class SmsQueueModelDirective implements OnInit {

  @Input() id: number = null;
  @Input() sms: Sms = new SmsModel();
  @Input() sendDateTime: string = null;
  @Input() enqueue: EventEmitter<any> = new EventEmitter<any>();

  private readonly endpoint: string = `/smsQueue`;

  constructor(private textApi: TextMsgItApiService, private toast: Toast) {
    /* maps the raw python models to typescript models via its extended class properties being angular @Input()s */
    //super();
  }

  ngOnInit() {
    // let enqueue = this.enqueue;

    // let post = this.enqueue.switchMap(result => this.post());

    // post.subscribe((result) => {
    //   this.toast.success({
    //     title: 'success!!',
    //     msg: 'sms successfully queued.'
    //   }).log(result);
    // }, (ex) => {
    //   this.toast.error({
    //     title: 'oops!!',
    //     msg: 'something went wrong.'
    //   }).log(ex);
    // });
  }

  post() {
    return this.textApi.post(this.endpoint, this.mapped);
  }

  get mapped() {
    let result: any = {};
    for (let prop in this)
      result[prop] = this[prop];
    return result;
  }

  /* needed? */
  // get model(){
  //   return new SmsQueueModel(this);
  // }

}
