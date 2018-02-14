import { Sms } from '../sms';

export interface SmsQueue {
    id?: number;
    sms: Sms;
    sendDateTime: string;
    forceSend?: boolean;
}
