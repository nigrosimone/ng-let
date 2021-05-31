import { Component } from '@angular/core';
import { defer, Observable, timer } from 'rxjs';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent {
  obs$: Observable<number> = defer(() => timer(3000, 1000));
  model = '';
}
