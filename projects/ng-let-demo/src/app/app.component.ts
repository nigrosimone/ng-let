import { Component, computed, DestroyRef, model, Signal, signal } from '@angular/core';
import { defer, Observable, timer } from 'rxjs';

@Component({
  // eslint-disable-next-line @angular-eslint/component-selector
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
  standalone: false
})
export class AppComponent {
  timer$: Observable<number> = defer(() => timer(3000, 1000));
  model = model<string>('test');
  timerSig = signal(1);
  object: Signal<{ x: boolean, y: number, z: string }> = computed(() => ({
    x: this.model() === 'test',
    y: this.timerSig(),
    z: this.model(),
  }));

  constructor(destroyRef: DestroyRef) {
    const interval = setInterval(() => this.timerSig.update(value => value + 1), 1000);
    destroyRef.onDestroy(() => {
      clearInterval(interval)
    });
  }
}
