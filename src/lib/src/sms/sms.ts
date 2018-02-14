export interface Sms {
    id?: number;
    accountId: number;
    toNumber?: string;
    fromNumber: string;
    message: string;
}
