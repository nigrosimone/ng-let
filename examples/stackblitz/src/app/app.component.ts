import { AsyncPipe } from '@angular/common';
import { Component } from '@angular/core';
import { interval, map, Observable, startWith } from 'rxjs';
import { NgLetDirective } from 'ng-let';

@Component({
  selector: 'app-root',
  imports: [NgLetDirective, AsyncPipe],
  template: `
    <!-- the observable is subscribed once, then reused as a local variable.
         without *ngLet, every {{ }} below would need its own | async -->
    <ng-container *ngLet="ticks$ | async as tick">
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
