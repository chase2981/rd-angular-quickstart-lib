/* tslint:disable:no-unused-variable */
import { Component, ElementRef, Inject, QueryList, ViewChild, ViewChildren } from '@angular/core';
import { TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { DebugElement } from '@angular/core';
import { ComponentFixture } from '@angular/core/testing';

import {
  async, inject
} from '@angular/core/testing';

import { CoreApiService, ImmutableService } from '../../core';
import { CoreApiServiceMock } from '../../core/testing';

import { RdAngularFormsModule } from '../../forms/forms.module';
import { RdAngularCoreModule } from '../core.module';
import { OneTimeBlockedApptDirective } from './one-time-blocked-appt.directive';
import { BlockedApptTimeDirective } from './blocked-appt-time.directive';

let component: MockWrapperComponent;
let fixture: ComponentFixture<MockWrapperComponent>;
let debugElem: DebugElement;
let elem: HTMLElement;

describe('Directive: OneTimeBlockedAppt', () => {
  let spy = {

  };

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [
        MockWrapperComponent
      ],
      imports: [
        RdAngularCoreModule,
        RdAngularFormsModule,
      ],
      providers: [
        { provide: CoreApiService, useValue: CoreApiServiceMock },
      ]
    });

    fixture = TestBed.createComponent(MockWrapperComponent);
    component = fixture.componentInstance;
    //fixture.detectChanges();
  });

  beforeEach(() => {
    //debugElem = fixture.debugElement.query(By.directive(UpcomingBlockedApptTimeDataLayerDirective));
  });

  it('should create an instance', inject([], () => {
    expect(component).toBeTruthy();
  }));

  it('should expose the directive instance', inject([], () => {
    expect(component.directive).toBeTruthy();
  }));

  describe('ngOnInit()', () => {
    let spy = {};

    beforeEach(() => {
      spy['get'] = spyOn(component.directive, 'get');
      fixture.detectChanges();
      component.directive.upcomingBlockedApptTimes = [
        { id: 2184, startTime: '12:00:00', endTime: '13:00:00' }
      ];
    });

    it('invokes get()', inject([], () => {
      expect(spy['get']).toHaveBeenCalled();
    }));

    it('upcomingBlockedApptTimes are set', inject([], () => {
      expect(component.directive.upcomingBlockedApptTimes).toBeTruthy();
      expect(component.directive.upcomingBlockedApptTimes.length).toBeTruthy();
    }));

    it('upcomingBlockedApptTimes are mapped', inject([], () => {
      fixture.detectChanges();
      expect(component.blockedApptTimeChildren).toBeTruthy();
      expect(component.blockedApptTimeChildren.length).toBeTruthy();
    }));

  });

});

@Component({
  template: `
<div #oneTimeBlockedAppt="rdOneTimeBlockedAppt" rdOneTimeBlockedAppt [communityGroupId]="communityGroupId" class="apptSettings__section">
	<div class="apptSettings__sectionTitle">One-Time Blocked Periods</div>
	<div class="apptSettings__sectionSubtitle">Block a period of time to prevent appointments from being scheduled</div>

<div #blockedApptTime="rdBlockedApptTime" rdBlockedApptTime [communityGroupId]="communityGroupId" (onPost)="oneTimeBlockedAppt.get()" class="well" style="background-color: whitesmoke;">

<div class="row">
	<div class="col-sm-3">
		<p class="label-sm">Date</p>
		<rd-datepicker-combo-select name="clientDate" [(ngModel)]="blockedApptTime.clientDate" [min]="blockedApptTime.min" (onChange)="blockedApptTime.onDateChange($event)"></rd-datepicker-combo-select>
	</div>
	<div class="col-sm-3">
		<p class="label-sm">Start time</p>
		<rd-timepicker-combo-select name="clientStartTime" [(ngModel)]="blockedApptTime.clientStartTime" [min]="blockedApptTime.dayOfWeekHour?.momentStartTime" [max]="blockedApptTime.dayOfWeekHour?.momentEndTime"
			[disabled]="!blockedApptTime.dayOfWeekHour"></rd-timepicker-combo-select>
	</div>
	<div class="col-sm-3">
		<p class="label-sm">End time</p>
		<rd-timepicker-combo-select name="clientEndTime" [(ngModel)]="blockedApptTime.clientEndTime" [min]="blockedApptTime.momentStartTime || blockedApptTime.dayOfWeekHour?.momentStartTime" [max]="blockedApptTime.dayOfWeekHour?.momentEndTime"
			[disabled]="!blockedApptTime.dayOfWeekHour"></rd-timepicker-combo-select>
	</div>

	<div class="col-sm-3" style="padding-top: 27px;">
		<button class="btn btn-success" type="submit" (click)="blockedApptTime.post()">Create blocked period</button>
	</div>
</div>

<p class="text-muted">Note: Date format must be MM/DD/YYYY -- Time format must be HH:MM AM/PM</p>

</div>


<div>
	<div style="font-weight: bold; font-size: 18px;">Upcoming blocked periods</div>

	<br />

	<div>

		<div *ngFor="let blockedApptTimeModel of oneTimeBlockedAppt?.upcomingBlockedApptTimes" #blockedApptTime="rdBlockedApptTime" rdBlockedApptTime [ngModel]="blockedApptTimeModel" [communityGroupId]="communityGroupId" (onDelete)="oneTimeBlockedAppt.get()">
			<div class="apptSettings__blocked">
				<span style="font-weight: bold;">{{blockedApptTime.displayDate}}</span>
				<span style="color:red; padding-left: 25px;">{{blockedApptTime.displayStartTime}} - {{blockedApptTime.displayEndTime}}</span>
				<div class="btn btn-link" style="display: inline-block; margin-left: 30px;" (click)="blockedApptTime.delete()">Remove</div>
			</div>
		</div>

	</div>

</div>

</div>
  `
})
export class MockWrapperComponent {
  @ViewChild(OneTimeBlockedApptDirective) directive: OneTimeBlockedApptDirective;
  @ViewChildren(BlockedApptTimeDirective) blockedApptTimeChildren: QueryList<BlockedApptTimeDirective[]>;

  communityGroupId: number = 1;
  result: any;

  constructor() { }

  onChange($event) {
    this.result = $event;
  }
}