import { MomentFormat } from '../../datetime';
import { SmsReceive } from './sms-receive';
import { Sms } from '../sms';

declare var moment;

export class SmsReceiveModel implements MomentFormat, SmsReceive {

    MOMENT_FORMAT: string = 'MM/DD/YYYY hh:mm a';

    id: number;
    sms: Sms;
    timeReceived: string;

    constructor(args?: any) {
        for (let key in args)
            this[key] = args[key];
    }

    get displayTimeReceived() {
        return moment(this.timeReceived).format(this.MOMENT_FORMAT)
    }
}
