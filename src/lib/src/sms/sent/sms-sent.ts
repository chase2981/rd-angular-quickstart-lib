import { Sms } from '../sms';
import { SentStatus } from '../sent-status';

export interface SmsSent {
  id?: number;
  sms: Sms;
  timeSent: string;
  sentStatus: SentStatus;
  // TODO add sent status foreign key relationship 'sent_status' string
}
