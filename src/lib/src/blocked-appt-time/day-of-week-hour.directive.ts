import { ChangeDetectorRef, Directive, Input, OnInit, Output, EventEmitter } from '@angular/core';
import { ControlValueAccessor } from '@angular/forms';
import { Subscription } from 'rxjs/Rx';

import { NgModelInputValueAccessor } from '../../forms/ng-model-input';
import { CoreApiService } from '../shared';
import { DayOfWeekHour, DayOfWeekHourModel } from './shared';

@Directive({
  selector: '[rdDayOfWeekHour]',
  exportAs: 'rdDayOfWeekHour',
  providers: [new NgModelInputValueAccessor(DayOfWeekHourDirective)]
})
export class DayOfWeekHourDirective extends DayOfWeekHourModel implements OnInit, ControlValueAccessor {
  @Input() communityGroupId: number;
  @Input() ngModel: DayOfWeekHour;

  onNgModelChanged: (_: any) => void;
  onNgModelTouched: (_: any) => void;

  constructor(private coreApiSvc: CoreApiService, private changeDetectorRef: ChangeDetectorRef) {
    super();
  }

  ngOnInit() {

  }

  get(communityGroupId: number) {
    return this.coreApiSvc.get(`/communityGroups/${communityGroupId}/dayOfWeekHours?include=day_of_week,community_group,blocked_appt_times`)
      // .flatMap(results => results)
      // .map(result => new DayOfWeekHourModel(result))
      // .toArray()
      .subscribe((result) => {
        //this.dayOfWeekHours.emit(result);
        this.changeDetectorRef.detectChanges();
      });
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
  writeValue(newVal){
    if (newVal)
      super.map(newVal);
  }
}
