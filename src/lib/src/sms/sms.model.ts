import { Sms } from './sms';

export class SmsModel implements Sms {
    id?: number = null;
    accountId: number = null;
    toNumber?: string = null;
    //toNumbers?: string[] = [''];
    fromNumber: string = null;
    message: string = null;
}