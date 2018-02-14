import { Input } from '@angular/core';

import { Sms } from '../sms';
import { SmsModel } from '../sms.model';
import { SmsQueue } from './sms-queue';

export class SmsQueueModel implements SmsQueue {
    @Input() id: number = null;
    @Input() sms: Sms = new SmsModel();
    @Input() sendDateTime: string = null;

    constructor(args?: any) {
        if (args)
            for (let prop in args) {
                this[prop] = args[prop];
            }
    }
}