declare var moment;

export interface SmsConversation {
    toNumber: string;
    fromNumber: string;
    time: string;
    message: string;
    incoming: boolean;
    isQueued?: boolean;
}

export class SmsConversationModel implements SmsConversation {
    toNumber: string = null;
    fromNumber: string = null;
    time: string = null;
    message: string = null;
    incoming: boolean = null;
    isQueued: boolean = false;

    constructor(args?: SmsConversation) {
        for (let key in args)
            this[key] = args[key];
    }

    get groupByDate(): string {
        return moment(this.time).format('MM/DD/YYYY');
    }

    get displayTime(): string {
        return moment(this.time).format('h:mm a')
    }
}
