import { Component, signal } from '@angular/core';
import { defer, Observable, timer } from 'rxjs';

@Component({
  // eslint-disable-next-line @angular-eslint/component-selector
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent {
  obs$: Observable<number> = defer(() => timer(3000, 1000));
  model = 'test';
  asignal = signal(1);
  object: { x: boolean, y: number, z: string, i: { test: string } } = {
    x: true,
    y: 1,
    z: this.model,
    i: { test: this.model }
  };

  constructor() {
    setInterval(() => this.asignal.update(value => value + 1), 1000)
  }
}
