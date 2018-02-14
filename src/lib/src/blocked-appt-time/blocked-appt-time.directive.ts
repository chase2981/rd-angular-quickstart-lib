import { ChangeDetectorRef, Directive, Input, Output, EventEmitter } from '@angular/core';
import { ControlValueAccessor } from '@angular/forms';
import { Subscription } from 'rxjs/Rx';
import * as moment from 'moment';

import { NgModelInputValueAccessor, NgModelInput } from '../../forms/ng-model-input';
import { CoreApiService } from '../shared';
import { isDefined } from '../helpers';
import { BlockedApptTime, BlockedApptTimeModel, DayOfWeekHourModel } from './shared';

@Directive({
  selector: '[rdBlockedApptTime]',
  exportAs: 'rdBlockedApptTime',
  providers: [new NgModelInputValueAccessor(BlockedApptTimeDirective)]
})
export class BlockedApptTimeDirective extends BlockedApptTimeModel implements ControlValueAccessor {
  @Input() communityGroupId: number;
  @Input() ngModel: BlockedApptTime;
  @Input() dayOfWeekId: number;
  @Output() onDelete: EventEmitter<any> = new EventEmitter<any>();
  @Output() onPost: EventEmitter<any> = new EventEmitter<any>();

  dayOfWeekHour: DayOfWeekHourModel;
  onNgModelChanged: (_: any) => void;
  onNgModelTouched: (_: any) => void;
  subscription = {
    getDayOfWeekHour: null
  };

  constructor(private coreApiSvc: CoreApiService, private changeDetectorRef: ChangeDetectorRef) {
    super();
  }

  ngOnInit() {
    if (!this.communityGroupId)
      throw Error('Please provide a communityGroupId to the BlockedApptTimeDirective');
  }

  get() {
    return this.coreApiSvc.get(`/communityGroups/${this.communityGroupId}/blockedApptTimes?include=community_group,community_group__community_group_day_of_week_hours&filters=!day_of_week_recur`)
      .flatMap(results => results)
      .map(result => new BlockedApptTimeModel(result))
      .toArray()
      .subscribe((result) => {
        //this.upcomingBlockedApptTimes = result;
        this.changeDetectorRef.detectChanges();
      });
  }

  post() {
    if (!this.valid())
      return;
    let body = this.getPostBody();
    return this.coreApiSvc.post(`/communityGroups/${this.communityGroupId}/blockedApptTimes`, body).subscribe(result => {
      // if (this.blockedApptTimeChildPreview)
      //   this.blockedApptTimeChildPreview.get(this.communityGroupId);
      this.onPost.emit(null);
      this.reset();
    });
  }

  delete() {
    if (!this.id)
      return;
    return this.coreApiSvc.delete(`/blockedApptTimes/${this.id}`).subscribe(result => {
      this.onDelete.emit(null);
    });
  }


  getDayOfWeekHour(newVal: moment.Moment) {
    let dayOfWeekId = newVal.day() === 0 ? 7 : newVal.day(); // if sunday, change to id of 7 instead of 0
    this.subscription.getDayOfWeekHour = this.coreApiSvc.get(`/communityGroups/${this.communityGroupId}/dayOfWeekHours?include=day_of_week,community_group,community_group__community_group_blocked_appt_times&filters=day_of_week=${dayOfWeekId}`).subscribe((result) => {
      this.dayOfWeekHour = result && result.length ? new DayOfWeekHourModel(result[0]) : null;
      this.changeDetectorRef.detectChanges();
    });
  }

  getPostBody(){
    let body = {
      startTime: this.startTime,
      endTime: this.endTime
    };

    if(!isDefined(this.dayOfWeekId))
      body['date'] = this.date;
    else
      body['dayOfWeekRecurId'] = this.dayOfWeekId;

    return body;
  }

  onDateChange(newVal: moment.Moment) {
    this.resetTime();
    this.getDayOfWeekHour(newVal);
  }

  //From ControlValueAccessor interface
  registerOnChange(fn: any) {
    this.onNgModelChanged = fn;
  }

  //From ControlValueAccessor interface
  registerOnTouched(fn: any) {
    this.onNgModelTouched = fn;
  }

  //From ControlValueAccessor interface
  writeValue(newVal) {
    if (newVal)
      super.map(newVal);
  }

  ngOnDestroy() {

  }
}
