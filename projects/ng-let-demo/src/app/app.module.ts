import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { AppComponent } from './app.component';
import { CommonModule } from '@angular/common';
import { NgLetDirective } from '../../../ng-let/src/public-api';

@NgModule({
    declarations: [AppComponent],
    bootstrap: [AppComponent],
    imports: [
        BrowserModule,
        FormsModule,
        CommonModule,
        NgLetDirective
    ]
})
export class AppModule { }
