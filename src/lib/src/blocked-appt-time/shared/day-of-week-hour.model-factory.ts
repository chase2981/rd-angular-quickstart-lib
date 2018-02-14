import { CoreApiService } from '../../../core';

import { DayOfWeekHourModel } from './day-of-week-hour.model';

export class DayOfWeekHourModelFactory {

  constructor(private coreApiSvc: CoreApiService){

  }

  // instantiates every instance in one easy-to-change location
  create(data?: any) {
    return new DayOfWeekHourModel(data);
  }

}