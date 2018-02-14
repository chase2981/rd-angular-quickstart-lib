<!--[![Build Status](https://travis-ci.org/ng2select/bootstrap.svg?branch=master)](https://travis-ci.org/ng2select/bootstrap)-->

## @rd/datetime@2.x

#### this module contains any logic specific to datetimes/timezones

http://rd.github.io

## installation

```
npm install @rd/datetime @rd/core moment moment-timezone --save

```

### angular-cli.json one-time configuration

```json

      "scripts": [
        "../node_modules/moment/min/moment.min.js",
        "../node_modules/moment-timezone/etc.
      ],

```

## how to import

```TypeScript  

import { RdAngularDatetimeModule } from '@rd/datetime';

```

## RdAngularDatetimeModule
the following section contains documentation on any components, directives, or modules which are exported by the RdAngularDatetimeModule

### TimezoneService
beneficial if you need to get local or utc timezone offset (caching available)

#### example

```TypeScript  

@Pipe({
  name: 'utcToLocalTime'
})
export class UtcToLocalTimePipe implements MomentFormat, PipeTransform {

  MOMENT_FORMAT: string = 'h:mm a';

  constructor(public timezoneSvc: TimezoneService) {

  }

  transform(utcISOString: string, accountId: number): any {
    return this.timezoneSvc.getLocalOffset(accountId, utcISOString)
      .map(result => {
        return result ? result.format(this.MOMENT_FORMAT) : moment.utc(utcISOString).format(this.MOMENT_FORMAT) + ' (UTC)';
      });
  }

}

```

<iframe src="http://embed.plnkr.co/GeHGKI/?show=preview" frameborder="0" width="100%" height="500"></iframe>

_powered by:_
https://rentdynamics.com +
https://angular.io
