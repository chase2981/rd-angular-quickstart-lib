/* tslint:disable:no-unused-variable */

import { TestBed, async } from '@angular/core/testing';

import { RdAngularSmsModule } from './sms.module';

describe('SmsModule', () => {
  let smsModule;

  beforeEach(() => {
    smsModule = new RdAngularSmsModule();
  });

  it('should create an instance', () => {
    expect(smsModule).toBeTruthy();
  })
});
