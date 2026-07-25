import { provideZonelessChangeDetection } from '@angular/core';
import { bootstrapApplication } from '@angular/platform-browser';
import { AppComponent } from './app/app.component';

void bootstrapApplication(AppComponent, {
  providers: [provideZonelessChangeDetection()],
});
