import { ChangeDetectorRef, Directive, Input, OnInit, Output, EventEmitter } from '@angular/core';
import { Subscription } from 'rxjs/Rx';
import * as moment from 'moment';

import { CoreApiService } from '../shared';
import { OrderByService } from '../order-by';
import { BlockedApptTime, DayOfWeekHour } from './shared';

@Directive({
  selector: '[rdOneTimeBlockedAppt]',
  exportAs: 'rdOneTimeBlockedAppt'
})
export class OneTimeBlockedApptDirective implements OnInit {
  @Input() communityGroupId: number;

  upcomingBlockedApptTimes: BlockedApptTime[] = [];

  constructor(private coreApiSvc: CoreApiService, private changeDetectorRef: ChangeDetectorRef, private orderBySvc: OrderByService) { }

  ngOnInit() {
    this.get();
  }

  get() {
    return this.coreApiSvc.get(`/communityGroups/${this.communityGroupId}/blockedApptTimes?include=community_group,community_group__community_group_day_of_week_hours&filters=!day_of_week_recur`)
      // .flatMap(results => results)
      // .map(result => new BlockedApptTimeModel(result))
      // .filter((result: BlockedApptTimeModel) =>
      //   result.momentDateTime.isAfter(moment())
      // )
      // .toArray()
      .subscribe((result: BlockedApptTime[]) => {
        this.upcomingBlockedApptTimes = this.orderBySvc.sort(result, 'date');
        this.changeDetectorRef.detectChanges();
      });
  }

  ngOnDestroy() {

  }
}
