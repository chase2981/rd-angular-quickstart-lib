import { Directive, ChangeDetectorRef, OnInit, Input } from '@angular/core';
import { NgModel } from '@angular/forms';
import * as moment from 'moment';
import { Subscription } from 'rxjs/Rx';

import { CoreApiService } from '../shared';
import { DayOfWeekHour } from './shared';

@Directive({
  selector: '[rdRecurringBlockedAppt]',
  exportAs: 'rdRecurringBlockedAppt'
})
export class RecurringBlockedApptDirective {
  @Input() communityGroupId: number;

  dayOfWeekHours: DayOfWeekHour[] = [];

  constructor(public coreApiSvc: CoreApiService, private changeDetectorRef: ChangeDetectorRef) { }

  ngOnInit() {
    this.get();
  }

  get() {
    return this.coreApiSvc.get(`/communityGroups/${this.communityGroupId}/dayOfWeekHours?include=day_of_week,community_group,blocked_appt_times`)
      // .flatMap(results => results)
      // .map(result => new DayOfWeekHourModel(result))
      // .toArray()
      .subscribe((result: DayOfWeekHour[]) => {
        this.dayOfWeekHours = result;
        this.changeDetectorRef.detectChanges();
      });
  }

}
