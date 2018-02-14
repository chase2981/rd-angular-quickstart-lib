<!--[![Build Status](https://travis-ci.org/ng2select/bootstrap.svg?branch=master)](https://travis-ci.org/ng2select/bootstrap)-->

## @rd/sms@2.x

#### this module contains an angular2 module meant to communicate with 
  the new textmsgit python api

http://rd.github.io

## installation

```
npm install @rd/sms @rd/core @rd/datetime moment moment-timezone --save

```

### angular-cli.json one-time configuration

```json

      "scripts": [
        "../node_modules/jquery/dist/jquery.min.js",
        "../node_modules/moment/min/moment.min.js",
        "../node_modules/moment-timezone/etc.
      ],

```

## how to import

```TypeScript  

import { RdAngularSmsModule } from '@rd/sms';

```

## RdAngularSmsModule
the following section contains documentation on any components, directives, or modules which are exported by the RdAngularSmsModule

### SmsQueueDirective
beneficial if you are looking to interface with the /smsQueues api endpoint via angular2

#### example

```HTML

        <div *ngFor="let toNumber of toNumbers; let i = index; trackBy: trackByFn" rdSmsQueue [sendDateTime]="sendDatetime" [sms]="sms" #sms="rdSms" rdSms [accountId]="accountId" [fromNumber]="fromNumber" [toNumber]="toNumber" [message]="message" class="editorRow">
          <input type="text" name="toNumber{{i}}" [rdUiMask]="'(999) 999-9999'" [(ngModel)]="toNumbers[i]" />
          <input type="button" (click)="removeToNumber(i)" value="-" class="deleteRow btn-small delete-button" style="margin-top: -8px;" />
        </div>

```

```TypeScript  

  post() {
    if (!this.smsQueueDirectives || !this.smsQueueDirectives.length)
      throw Error('smsQueue directive(s) not found');

    Observable.from(this.smsQueueDirectives.toArray())
      .mergeMap(smsQueue => {
        return smsQueue.post()
          .do(postResult => smsQueue.isQueued = true)
          .catch((ex, caught) => {
            //smsQueue.postErrorMessage = ex;
            return caught;
          })
      }).toArray()
      .subscribe((smsQueues: any[]) => {
        this.allQueued = true;
        this.reset();
        this.toast.success({
          msg: `${smsQueues.length} message(s) queued successfully`
        });
      });
  }

```

<iframe src="http://embed.plnkr.co/GeHGKI/?show=preview" frameborder="0" width="100%" height="500"></iframe>

_powered by:_
https://rentdynamics.com +
https://angular.io
