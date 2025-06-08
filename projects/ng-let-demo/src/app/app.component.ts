import { Component, computed, DestroyRef, inject, model, Signal, signal } from '@angular/core';
import { defer, Observable, timer } from 'rxjs';

@Component({
  // eslint-disable-next-line @angular-eslint/component-selector
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
  // eslint-disable-next-line @angular-eslint/prefer-standalone
  standalone: false
})
export class AppComponent {
  destroyRef = inject(DestroyRef);
  timer$: Observable<number> = defer(() => timer(3000, 1000));
  model = model<string>('test');
  timerSig = signal(1);
  object: Signal<{ x: boolean, y: number, z: string }> = computed(() => ({
    x: this.model() === 'test',
    y: this.timerSig(),
    z: this.model(),
  }));

  constructor() {
    const interval = setInterval(() => this.timerSig.update(value => value + 1), 1000);
    this.destroyRef.onDestroy(() => {
      clearInterval(interval)
    });
  }
}
