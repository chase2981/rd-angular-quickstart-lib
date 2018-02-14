/* tslint:disable:no-unused-variable */
import { Component, ElementRef, Inject, ViewChild } from '@angular/core';
import { TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { DebugElement } from '@angular/core';
import { ComponentFixture } from '@angular/core/testing';

import {
  async, inject
} from '@angular/core/testing';

import { CoreApiService, ImmutableService } from '../../core';
import { CoreApiServiceMock } from '../../core/testing';
import { OrderByModule } from '../order-by';

import { RdAngularCoreModule } from '../core.module';
import { BlockedApptTimeDirective } from './blocked-appt-time.directive';

let component: MockWrapperComponent;
let fixture: ComponentFixture<MockWrapperComponent>;
let debugElem: DebugElement;
let elem: HTMLElement;

describe('Directive: BlockedApptTime', () => {
  let spy = {

  };

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [
        MockWrapperComponent
      ],
      imports: [
        RdAngularCoreModule,
        OrderByModule,
      ],
      providers: [
        { provide: CoreApiService, useValue: CoreApiServiceMock },
        ImmutableService
      ]
    });

    fixture = TestBed.createComponent(MockWrapperComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
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

  // it('debugElem should be defined', inject([], () => {
  //   expect(debugElem).toBeTruthy();
  // }));

});

@Component({
  template: `
    <div rdBlockedApptTime [communityGroupId]="communityGroupId"></div>
  `
})
export class MockWrapperComponent {
  @ViewChild(BlockedApptTimeDirective) directive: BlockedApptTimeDirective;

  communityGroupId: number = 1;
  result: any;

  constructor() { }

  onChange($event) {
    this.result = $event;
  }
}