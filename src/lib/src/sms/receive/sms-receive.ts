import { Sms } from '../sms';

export interface SmsReceive {
  id: number;
  timeReceived: string;
  sms: Sms
}
