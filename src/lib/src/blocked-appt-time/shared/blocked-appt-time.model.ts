import { Injectable, Inject } from '@angular/core';
import * as moment from 'moment';
import { DayOfWeekHour } from './day-of-week-hour';
import { BlockedApptTime } from './blocked-appt-time';
import { StartTimeEndTimeModel } from './start-time-end-time.model';

export class BlockedApptTimeModel extends StartTimeEndTimeModel {
    id: number = null;
    clientDate: moment.Moment = null;
    min: Date = new Date();
    visible: boolean = false;

    constructor(args?: BlockedApptTime) {
        super();
        this.map(args);
    }

    map(args?: BlockedApptTime) {
        if (!args)
            return;

        for (let key in args)
            this[key] = args[key];
    }

    cancel() {
        this.reset();
        this.visible = false;
    }

    isInPast() {
        return this.momentDateTime && this.momentDateTime.isBefore(moment());
    }

    reset() {
        this.resetDate();
        this.resetTime();
    }

    resetDate() {
        this.clientDate = null;
    }

    resetTime() {
        this.clientStartTime = null;
        this.clientEndTime = null;
    }

    valid() {
        return this.clientStartTime && this.clientEndTime;
    }

    get date(): string {
        return this.clientDate ? this.clientDate.format(this.format.server.date) : null;
    }
    set date(newVal) {
        this.clientDate = newVal ? moment(newVal.substring(0, 10)).utc() : null;
    }
    get displayDate() {
        return this.momentDate ? this.momentDate.format(this.format.display.date) : null;
    }
    get momentDate() {
        return this.clientDate;
    }
    get momentDateTime() {
        return this.clientDate && this.clientEndTime ? moment(`${this.clientDate.format('MM/DD/YYYY')} ${this.clientEndTime}`, 'MM/DD/YYYY h:mm a') : null;
    }
}
