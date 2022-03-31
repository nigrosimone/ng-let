# NgLet [![Build Status](https://app.travis-ci.com/nigrosimone/ng-let.svg?branch=main)](https://app.travis-ci.com/nigrosimone/ng-let) [![Coverage Status](https://coveralls.io/repos/github/nigrosimone/ng-let/badge.svg?branch=main)](https://coveralls.io/github/nigrosimone/ng-let?branch=main) [![NPM version](https://img.shields.io/npm/v/ng-let.svg)](https://www.npmjs.com/package/ng-let)

Angular structural directive for sharing data as local variable into html component template.

## Description

Sometime there is a need to share data into component template as local variable. 
This structural directive create local context of variable that can be used into html template.

See the [stackblitz demo](https://stackblitz.com/edit/demo-ng-let?file=src%2Fapp%2Fapp.component.ts).

## Features

✅ Observable support<br>
✅ Async pipe support<br>
✅ NgModel support<br>
✅ Type casting<br>

## Get Started

*Step 1*: install `ng-let`

```bash
npm i ng-let
```

*Step 2*: Import `NgLetModule` into your app module, eg.:

```ts
import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { AppComponent } from './app.component';

import { NgLetModule } from 'ng-let';

@NgModule({
  declarations: [AppComponent],
  imports: [
    BrowserModule,
    NgLetModule,
  ],
  providers: [],
  bootstrap: [AppComponent],
  ],
})
export class AppModule { }
```

*Step 3*: usage, eg.:

```ts
import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  template: `
  <ng-container *ngLet="(num1 + num2) as total"> <!-- single computation -->
    <div>
      1: {{ total }} <!-- 3 -->
    </div>
    <div>
      2: {{ total }} <!-- 3 -->
    </div>
  </ng-container> 
  `,
})
export class AppComponent {
  num1: number = 1;
  num2: number = 2;
}
```

or with the implicit sintax:

```ts
import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  template: `
  <ng-container *ngLet="(num1 + num2); let total"> <!-- single computation -->
    <div>
      1: {{ total }} <!-- 3 -->
    </div>
    <div>
      2: {{ total }} <!-- 3 -->
    </div>
  </ng-container> 
  `,
})
export class AppComponent {
  num1: number = 1;
  num2: number = 2;
}
```

## Examples

Below there are some examples of use case.

### Example: observable

Example of use with observable, eg.:

```ts
import { Component } from '@angular/core';
import { defer, Observable, timer } from 'rxjs';

@Component({
  selector: 'app-root',
  template: `
  <ng-container *ngLet="timer$ | async as time"> <!-- single subscription -->
    <div>
      1: {{ time }}
    </div>
    <div>
      2: {{ time }}
    </div>
  </ng-container>
  `,
})
export class AppComponent {
  timer$: Observable<number> = defer(() => timer(3000, 1000));
}
```

or with the implicit sintax:

```ts
import { Component } from '@angular/core';
import { defer, Observable, timer } from 'rxjs';

@Component({
  selector: 'app-root',
  template: `
  <ng-container *ngLet="timer$ | async; let time"> <!-- single subscription -->
    <div>
      1: {{ time }}
    </div>
    <div>
      2: {{ time }}
    </div>
  </ng-container>
  `,
})
export class AppComponent {
  timer$: Observable<number> = defer(() => timer(3000, 1000));
}
```

## Support

This is an open-source project. Star this [repository](https://github.com/nigrosimone/ng-let), if you like it, or even [donate](https://www.paypal.com/paypalme/snwp). Thank you so much! 

## My other libraries

I have published some other Angular libraries, take a look:

 - [NgSimpleState: Simple state management in Angular with only Services and RxJS](https://www.npmjs.com/package/ng-simple-state)
 - [NgPortal: Component property connection in Angular application](https://www.npmjs.com/package/ng-portal)
 - [NgHttpCaching: Cache for HTTP requests in Angular application](https://www.npmjs.com/package/ng-http-caching)
 - [NgGenericPipe: Generic pipe for Angular application](https://www.npmjs.com/package/ng-generic-pipe)
 - [NgLet: Structural directive for sharing data as local variable into html component template](https://www.npmjs.com/package/ng-let)
 - [NgLock: Angular decorator for lock a function and user interface while a task running](https://www.npmjs.com/package/ng-lock)
 - [NgCondition: An alternative to `*ngIf; else` directive for simplify conditions into HTML template for Angular application](https://www.npmjs.com/package/ng-condition)
