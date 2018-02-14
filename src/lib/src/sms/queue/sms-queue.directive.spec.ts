/* tslint:disable:no-unused-variable */
import { async, ComponentFixture, inject, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { AfterViewInit, Component, ViewChild, DebugElement } from '@angular/core';
import { RouterTestingModule } from '@angular/router/testing';
import { Observable } from 'rxjs/Rx';
import * as moment from 'moment';

import { CoreApiService, ImmutableService, TextMsgItApiService } from '../../shared';
import { CoreApiServiceMock } from '../../testing';
import { Toast } from '../../../common';

import { TimezoneService } from '../../datetime';
import { SmsQueueDirective } from './sms-queue.directive';
import { RdAngularSmsModule } from '../sms.module';

describe('Directive: SmsQueue', () => {
  let component: MockWrapperComponent;
  let debugElem: DebugElement;
  let directive: SmsQueueDirective;
  let fixture: ComponentFixture<MockWrapperComponent>;
  let spy = {
    onInit: null,
    timezoneSvc: {
      getUtcOffset: null
    }
  };

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [
        MockWrapperComponent
      ],
      imports: [
        RdAngularSmsModule,
        RouterTestingModule
      ],
      providers: [
        ImmutableService,
        TimezoneService,
        Toast,
        { provide: CoreApiService, useValue: CoreApiServiceMock },
        { provide: TextMsgItApiService, useValue: CoreApiServiceMock },
      ]
    });
  });

  beforeEach(inject([TimezoneService], (timezoneSvc: TimezoneService) => {
    fixture = TestBed.createComponent(MockWrapperComponent);
    component = fixture.componentInstance;
    debugElem = fixture.debugElement;
    spy.timezoneSvc.getUtcOffset = spyOn(timezoneSvc, 'getUtcOffset').and.callFake(() => {
      return Observable.of({ toISOString: () => 'getUtcOffsetResult' });
    });
    spy.onInit = spyOn(component.directive, 'ngOnInit').and.callFake(() => {
      let self = component.directive;
      if (!self.utcSendDateTime && self.sms && self.sendDateTime)
        self.timezoneSvc.getUtcOffset(self.sms.accountId, self.sendDateTime).subscribe((customUtcMoment) => {
          self.utcSendDateTime = customUtcMoment.toISOString();
        });
    });
  }));

  beforeEach(() => {
    /* latest way to access directive that you are testing--in our tests */
    //directive = debugElem.query(By.directive(SmsQueueDirective)).componentInstance;
  });

  it('should create', () => {
    fixture.detectChanges();
    expect(component).toBeTruthy();
  });

  it('should create SmsQueueDirective', () => {
    fixture.detectChanges();
    expect(component.directive).toBeTruthy();
  });

  it('SHOULD invoke getUtcOffset when utcSendDateTime DOES NOT EXIST', () => {
    component.directive.sendDateTime = 'sendDateTime';
    component.directive.utcSendDateTime = null;
    component.directive.sms = {
      id: 1,
      accountId: 88,
      fromNumber: '4352232707',
      toNumber: '4357708760',
      message: 'turbo will forever be loved'
    };
    fixture.detectChanges();
    expect(spy.timezoneSvc.getUtcOffset).toHaveBeenCalled();
    expect(component.directive.utcSendDateTime).toBe('getUtcOffsetResult');
    expect(component.directive.model.sendDateTime).toBe('getUtcOffsetResult');
  });

  it('SHOULD NOT invoke getUtcOffset when utcSendDateTime EXISTS', () => {
    component.directive.sendDateTime = 'sendDateTime';
    component.directive.utcSendDateTime = 'utcSendDateTime';
    component.directive.sms = {
      id: 1,
      accountId: 88,
      fromNumber: '4352232707',
      toNumber: '4357708760',
      message: 'turbo will forever be loved'
    };
    fixture.detectChanges();
    expect(spy.timezoneSvc.getUtcOffset).not.toHaveBeenCalled();
    expect(component.directive.utcSendDateTime).toBe('utcSendDateTime');
    expect(component.directive.model.sendDateTime).toBe('utcSendDateTime');
  });
});

@Component({
  template:
  `
<div rdSmsQueue></div>
  `
})
export class MockWrapperComponent implements AfterViewInit {
  /* alternate way you could access directive
    @ViewChild()--works in tests and in production */
  /* you would access it this way via component.directive */
  /* not available until afterViewInit() */
  @ViewChild(SmsQueueDirective) directive: SmsQueueDirective;

  constructor() { }

  ngAfterViewInit() {
    /* directive should be defined now */
  }

}
