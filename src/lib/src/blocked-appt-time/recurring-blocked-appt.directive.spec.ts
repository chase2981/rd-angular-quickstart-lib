/* tslint:disable:no-unused-variable */
import { Component, ElementRef, Inject, QueryList, ViewChild, ViewChildren } from '@angular/core';
import { TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { DebugElement } from '@angular/core';
import { ComponentFixture } from '@angular/core/testing';
import { Observable } from 'rxjs/Rx';

import {
  async, inject
} from '@angular/core/testing';

import { CoreApiService } from '../shared';
import { CoreApiServiceMock } from '../testing';
import { OrderByModule } from '../order-by';

import { RdAngularCoreModule } from '../core.module';
import { RdAngularFormsModule } from '../../forms/forms.module';
import { RecurringBlockedApptDirective } from './recurring-blocked-appt.directive';
import { BlockedApptTimeDirective } from './blocked-appt-time.directive';
import { DayOfWeekHourDirective } from './day-of-week-hour.directive';

let component: MockWrapperComponent;
let fixture: ComponentFixture<MockWrapperComponent>;
let debugElem: DebugElement;
let elem: HTMLElement;

describe('Directive: RecurringBlockedAppt', () => {
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
        { provide: CoreApiService, useValue: CoreApiServiceMock }
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
      component.directive.dayOfWeekHours = [
        { id: 1, dayOfWeek: { id: 1, name: 'Monday' }, startTime: '08:30:00', endTime: '16:00:00', blockedApptTimes: [{ id: 2184, startTime: '12:00:00', endTime: '13:00:00' }] },
        { id: 2, dayOfWeek: { id: 2, name: 'Tuesday' }, startTime: '08:30:00', endTime: '16:00:00', blockedApptTimes: [] }
      ];
    });

    it('invokes get()', inject([], () => {
      expect(spy['get']).toHaveBeenCalled();
    }));

    it('dayOfWeekHours are set', inject([], () => {
      expect(component.directive.dayOfWeekHours).toBeTruthy();
      expect(component.directive.dayOfWeekHours.length).toBeTruthy();
    }));

    it('dayOfWeekHours are mapped', inject([], () => {
      fixture.detectChanges();
      expect(component.dayOfWeekHourChildren).toBeTruthy();
      expect(component.dayOfWeekHourChildren.length).toBeTruthy();
    }));

    it('blockedApptTimes are mapped', inject([], () => {
      fixture.detectChanges();
      expect(component.blockedApptTimeChildren).toBeTruthy();
      expect(component.blockedApptTimeChildren.length).toBeTruthy();
    }));

  });

});

@Component({
  template: `
    <div #recurringBlockedAppt="rdRecurringBlockedAppt" rdRecurringBlockedAppt [communityGroupId]="communityGroupId">

  <div class="apptSettings__section">
  <div class="apptSettings__sectionTitle">Recurring Blocked Periods</div>
  <div class="apptSettings__sectionSubtitle">Block a weekly-recurring period of time to prevent appointments from being scheduled</div>

  <div #dayOfWeekHour="rdDayOfWeekHour" rdDayOfWeekHour [ngModel]="dayOfWeek" *ngFor="let dayOfWeek of recurringBlockedAppt.dayOfWeekHours; let isLastDayOfWeekItem = last;" class="apptSettings__day">
    <div class="row">
      <div class="col-sm-2">
        <div class="apptSettings__dayLabel">{{dayOfWeekHour.dayOfWeek?.name}}</div>
      </div>
      <div class="col-sm-10">

        <div class="apptSettings__officeHours">Office Hours: {{dayOfWeekHour.displayStartTime}} - {{dayOfWeekHour.displayEndTime}}</div>
        <br />

        <div *ngFor="let blockedTime of dayOfWeekHour.blockedApptTimes" #blockedApptTime="rdBlockedApptTime" rdBlockedApptTime [ngModel]="blockedTime" [communityGroupId]="communityGroupId">
          <div class="apptSettings__blocked">
            <span style="color:red;">{{blockedApptTime.displayStartTime}} - {{blockedApptTime.displayEndTime}}</span>
            <div class="btn btn-link" style="display: inline-block; margin-left: 30px;" (click)="delete(blockedApptTime.id)">Remove</div>
          </div>
        </div>

        <div #blockedApptTime="rdBlockedApptTime" rdBlockedApptTime [communityGroupId]="communityGroupId">

            <div *ngIf="blockedApptTime?.visible">
              <div class="well" style="background-color: whitesmoke">
                <div class="row">
                  <div class="col-sm-3">
                    <p class="label-sm">Start time</p>
                      <rd-timepicker-combo-select [(ngModel)]="blockedApptTime.clientStartTime" [min]="dayOfWeekHour.momentStartTime" [max]="dayOfWeekHour.momentEndTime"></rd-timepicker-combo-select>
                  </div>
                  <div class="col-sm-3">
                    <p class="label-sm">End time</p>
                      <rd-timepicker-combo-select [(ngModel)]="blockedApptTime.clientEndTime" [min]="dayOfWeekHour.momentStartTime" [max]="dayOfWeekHour.momentEndTime"></rd-timepicker-combo-select>
                    </div>
                  <div class="col-sm-6" style="padding-top: 27px;">
                    <button class="btn btn-success" type="submit" (click)="blockedApptTime.post()">Create recurring blocked period</button>
                    <button class="btn btn-link" type="submit" (click)="blockedApptTime.cancel()">Cancel</button>
                  </div>
                </div>
              </div>
            </div>
          
            <div *ngIf="!blockedApptTime?.visible" class="btn btn-link" (click)="blockedApptTime.visible = true">Add</div>
        
        </div>
    </div>
  </div>
</div> 


    </div>
  `
})
export class MockWrapperComponent {
  @ViewChild(RecurringBlockedApptDirective) directive: RecurringBlockedApptDirective;
  @ViewChildren(BlockedApptTimeDirective) blockedApptTimeChildren: QueryList<BlockedApptTimeDirective[]>;
  @ViewChildren(DayOfWeekHourDirective) dayOfWeekHourChildren: QueryList<DayOfWeekHourDirective[]>;

  communityGroupId: number = 1;
  result: any;

  constructor() { }

  onChange($event) {
    this.result = $event;
  }
}
