import { JsonPipe, AsyncPipe } from '@angular/common';
import { ChangeDetectionStrategy, Component, computed, model, Signal, signal } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { interval, map, Observable, startWith } from 'rxjs';
import { NgLetDirective } from 'ng-let';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
  imports: [NgLetDirective, FormsModule, AsyncPipe, JsonPipe],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class AppComponent {
  timer$: Observable<number> = interval(1000).pipe(
    map((value) => value + 1),
    startWith(0),
  );
  model = model<string>('test');
  timerSig = signal(1);
  object: Signal<{ x: boolean; y: number; z: string }> = computed(() => ({
    x: this.model() === 'test',
    y: this.timerSig(),
    z: this.model(),
  }));
}
