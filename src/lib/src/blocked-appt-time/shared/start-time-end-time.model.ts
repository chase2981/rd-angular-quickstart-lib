import * as moment from 'moment';

export class StartTimeEndTimeModel {
    clientStartTime: string = null;
    clientEndTime: string = null;
    format = {
        client: {
            time: 'h:mm a'
        },
        display: {
            time: 'h:mm a',
            date: 'MM/DD/YY'
        },
        server: {
            time: 'HH:mm:ss',
            date: 'MM/DD/YY'
        }
    }

    constructor() {

    }

    get startTime(): string {
        return this.clientStartTime ? moment(this.clientStartTime, this.format.client.time).format(this.format.server.time) : null;
    }
    set startTime(newVal) {
        this.clientStartTime = newVal ? moment(newVal, this.format.server.time).format(this.format.client.time) : null;
    }

    get endTime(): string {
        return this.clientEndTime ? moment(this.clientEndTime, this.format.client.time).format(this.format.server.time) : null;
    }
    set endTime(newVal) {
        this.clientEndTime = newVal ? moment(newVal, this.format.server.time).format(this.format.client.time) : null;
    }

    get displayStartTime() {
        return this.momentStartTime ? this.momentStartTime.format(this.format.display.time) : null;
    }
    get displayEndTime() {
        return this.momentEndTime ? this.momentEndTime.format(this.format.display.time) : null;
    }

    get momentStartTime() {
        return this.clientStartTime ? moment(this.clientStartTime, this.format.client.time) : null;
    }
    get momentEndTime() {
        return this.clientEndTime ? moment(this.clientEndTime, this.format.client.time) : null;
    }

    isClosed(){
        return this.startTime === '00:00:00' && this.endTime === '00:00:00';
    }

    isTwentyFourHour(){
        return this.startTime === '00:00:00' && (this.endTime === '23:59:00' || this.endTime === '23:59:59');
    }

    setClosed(){
        this.startTime = '00:00:00';
        this.endTime = '00:00:00';
    }

    setConventional(){
        this.startTime = '08:00:00';
        this.endTime = '17:00:00';
    }

    setTwentyFourHour(){
        this.startTime = '00:00:00';
        this.endTime = '23:59:59';
    }
}