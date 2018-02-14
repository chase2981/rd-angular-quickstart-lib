/* tslint:disable:no-unused-variable */
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { AfterViewInit, Component, ViewChild, DebugElement } from '@angular/core';

import { CoreApiService, ImmutableService, TextMsgItApiService } from '../../shared';
import { CoreApiServiceMock } from '../../testing';

import { SmsOptOutDirective } from './sms-opt-out.directive';
import { RdAngularSmsModule } from '../sms.module';

describe('Directive: SmsOptOut', () => {
  let component: MockWrapperComponent;
  let debugElem: DebugElement;
  let directive: SmsOptOutDirective;
  let fixture: ComponentFixture<MockWrapperComponent>;


  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [
        MockWrapperComponent
      ],
      imports: [
        RdAngularSmsModule
      ],
      providers: [
        ImmutableService,
        { provide: CoreApiService, useValue: CoreApiServiceMock },
        { provide: TextMsgItApiService, useValue: CoreApiServiceMock },
      ]
    });
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(MockWrapperComponent);
    component = fixture.componentInstance;
    debugElem = fixture.debugElement;
    fixture.detectChanges();
  });

  beforeEach(() => {
    /* latest way to access directive that you are testing--in our tests */
    //directive = debugElem.query(By.directive(SmsOptOutDirective)).componentInstance;
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should create SmsOptOutDirective', () => {
    expect(component.directive).toBeTruthy();
  });
});

@Component({
  template:
  `<div rdSmsOptOut></div>`
})
export class MockWrapperComponent implements AfterViewInit {
  /* alternate way you could access directive 
    @ViewChild()--works in tests and in production */
  /* you would access it this way via component.directive */
  /* not available until afterViewInit() */
  @ViewChild(SmsOptOutDirective) directive: SmsOptOutDirective;

  constructor() { }

  ngAfterViewInit() {
    /* directive should be defined now */
  }

}