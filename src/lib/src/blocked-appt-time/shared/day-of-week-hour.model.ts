import { Injectable, Inject } from '@angular/core';
import * as moment from 'moment';

import { DayOfWeekHour } from './day-of-week-hour';
import { BlockedApptTime } from './blocked-appt-time';
import { BlockedApptTimeModel } from './blocked-appt-time.model';
import { StartTimeEndTimeModel } from './start-time-end-time.model';

@Injectable()
export class DayOfWeekHourModel extends StartTimeEndTimeModel {
    id: number;
    blockedApptTimes: BlockedApptTime[] = [];
    communityGroupId: number = null;
    dayOfWeekId: number = null;
    dayOfWeek: any = null;

    constructor(args?: DayOfWeekHour) {
        super();
        this.map(args);
    }

    map(args?: DayOfWeekHour) {
        if(!args)
            return;
            
        for (let key in args)
            this[key] = args[key];
    }

    reset() {
        this.resetTime();
    }

    resetTime() {
        this.clientStartTime = null;
        this.clientEndTime = null;
    }
}
