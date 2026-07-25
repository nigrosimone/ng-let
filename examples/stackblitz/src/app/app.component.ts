import { AsyncPipe } from '@angular/common';
import { Component } from '@angular/core';
import { interval, map, Observable, startWith } from 'rxjs';
import { NgLetDirective } from 'ng-let';

@Component({
  selector: 'app-root',
  imports: [NgLetDirective, AsyncPipe],
  template: `
    <!-- the observable is subscribed once, then reused as a local variable:
         without *ngLet every interpolation below would need its own async pipe,
         and so its own subscription.
         the ?? 0 is there because *ngLet renders before the first value arrives.
         unlike *ngIf it never hides its content, so the type stays nullable -->
    <ng-container *ngLet="(ticks$ | async) ?? 0 as tick">
      <p>tick: {{ tick }}</p>
      <p>doubled: {{ tick * 2 }}</p>
      <p>even: {{ tick % 2 === 0 }}</p>
    </ng-container>
  `,
})
export class AppComponent {
  ticks$: Observable<number> = interval(1000).pipe(
    map((value) => value + 1),
    startWith(0),
  );
}
