import { MomentFormat } from '../../datetime';
import { SmsSent } from './sms-sent';
import { Sms } from '../sms';
import { SentStatus } from '../sent-status';

declare var moment;

export class SmsSentModel implements MomentFormat, SmsSent {

  MOMENT_FORMAT: string = 'MM/DD/YYYY hh:mm a';

  id: number;
  sms: Sms;
  timeSent: string;
  sentStatus: SentStatus;

  constructor(args?: any) {
    for (let key in args)
      this[key] = args[key];
  }

  get displayTimeSent() {
    return moment(this.timeSent).format(this.MOMENT_FORMAT);
  }
}
