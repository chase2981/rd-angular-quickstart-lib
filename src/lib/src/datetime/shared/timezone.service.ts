import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Rx';

import { CoreApiService } from '../../shared';

import { MomentFormat } from './moment-format';

declare var moment;

export interface HttpRequestCache {
  [key: string]: Observable<any>;
}

@Injectable()
export class TimezoneService implements MomentFormat {

  MOMENT_FORMAT: string = 'MM/DD/YYYY hh:mm a';

  private communityGroupTimezone$: HttpRequestCache = {};
  private localOffset$: any = {};
  private utcOffset$: any = {};

  constructor(private coreApiSvc: CoreApiService) { }

  getAccountTimezone(accountId: number) {
    if (!accountId)
      return Observable.of([]);
      
    if (!this.communityGroupTimezone$[accountId])
      this.communityGroupTimezone$[accountId] = this.coreApiSvc.get(`/communityGroups?filters=textmsgit_account=${accountId}&include=client,timeZoneType`)
        .catch((err: any, caught: Observable<any>) => Observable.of([]))
        .publishReplay(1)
        .refCount();
    return this.communityGroupTimezone$[accountId];
  }

  getLocalOffset(accountId: number, utcDatetime: string) {
    return this.getAccountTimezone(accountId).map(result => {
      if (!result || !result[0])
        return;
      let timezone = result[0].timeZoneType;
      let ianaName = timezone.ianaName;
      let localMomentTz = moment.tz(utcDatetime, [this.MOMENT_FORMAT, moment.ISO_8601], ianaName);
      return localMomentTz;
    });
  }

  getUtcOffset(accountId: number, datetime: string) {
    return this.getAccountTimezone(accountId).map(result => {
      if (!result || !result[0])
        return;
      let timezone = result[0].timeZoneType;
      let ianaName = timezone.ianaName;
      let utcMomentTz = moment.tz(datetime, [this.MOMENT_FORMAT, moment.ISO_8601], ianaName);
      return utcMomentTz.utc();
    });
  }
}
