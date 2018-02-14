<!--[![Build Status](https://travis-ci.org/ng2select/bootstrap.svg?branch=master)](https://travis-ci.org/ng2select/bootstrap)-->

## @rd/core@2.x

#### this module contains any javascript code that is essential to every application.
it is reliant on the @angular/core, @angular/common modules. this module contains, but is not limited to, base classes, etc of which are core to any front-end javascript architecture.

http://rd.github.io

## installation

```
npm install @rd/core jssha --save

```

### angular-cli.json one-time configuration

```json

      "scripts": [
        "../node_modules/jssha/src/sha.js",
      ],

```

## how to import

```TypeScript  

import { RdAngularCommonModule } from '@rd/common';

```

## OrderByObjectPipe
```
*ngFor="let client of clients | async | orderByObject: ['name']"

```
or
```
*ngFor="let client of clients | async | orderByObject: ['-name']"

```

<iframe src="http://embed.plnkr.co/GeHGKI/?show=preview" frameborder="0" width="100%" height="500"></iframe>

_powered by:_
https://rentdynamics.com +
https://angular.io
