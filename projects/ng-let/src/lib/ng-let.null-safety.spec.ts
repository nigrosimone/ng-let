import { Component } from '@angular/core';
import { TestBed } from '@angular/core/testing';
import { NgLetDirective } from '../public-api';

describe('null safety', () => {
  // Regression: the directive used to declare `ngTemplateGuard_ngLet: 'binding'`, which
  // narrows the bound expression to truthy inside the template exactly like *ngIf does.
  // *ngLet renders unconditionally, so the narrowing was a lie: this very template
  // compiled under strictTemplates and threw `Cannot read properties of null` at runtime.
  // Without the marker the unguarded form no longer compiles, and the guarded one below
  // is the only thing that does.
  it('keeps a nullable expression nullable, so the template has to guard it', () => {
    @Component({
      template: `<ng-container *ngLet="value">[{{ value?.length }}]</ng-container>`,
      imports: [NgLetDirective],
    })
    class TestComponent {
      value: string | null = null;
    }

    const fixture = TestBed.createComponent(TestComponent);
    fixture.detectChanges();
    expect(((fixture.nativeElement as HTMLElement).textContent ?? '').trim()).toBe('[]');
  });

  it('renders the aliased value with no narrowing applied to it either', () => {
    @Component({
      template: `<ng-container *ngLet="value as data">[{{ data?.length }}]</ng-container>`,
      imports: [NgLetDirective],
    })
    class TestComponent {
      value: string | null = 'test';
    }

    const fixture = TestBed.createComponent(TestComponent);
    fixture.detectChanges();
    expect(((fixture.nativeElement as HTMLElement).textContent ?? '').trim()).toBe('[4]');
  });
});
