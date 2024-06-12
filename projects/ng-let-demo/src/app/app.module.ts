import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { provideHttpClient, withInterceptorsFromDi } from '@angular/common/http';
import { AppComponent } from './app.component';
import { CommonModule } from '@angular/common';
import { NgLetModule } from '../../../ng-let/src/public-api';

@NgModule({ declarations: [AppComponent],
    bootstrap: [AppComponent], imports: [BrowserModule,
        FormsModule,
        CommonModule,
        NgLetModule], providers: [provideHttpClient(withInterceptorsFromDi())] })
export class AppModule { }
