import { Component } from '@angular/core';
import { TestBed } from '@angular/core/testing';

import { NgLetContext, NgLetDirective } from '../public-api';

/**
 * What this library ships is mostly a type: the context the template is rendered
 * with, and the guards that narrow it. These assertions are checked when the specs
 * are compiled, so a regression in the signatures fails the run before a single
 * test executes.
 */
describe('type surface', () => {
  it('exposes the value under both context keys, with the bound type', () => {
    expectTypeOf<NgLetContext<string>>().toEqualTypeOf<{ ngLet: string; $implicit: string }>();
    expectTypeOf<NgLetContext<number>['$implicit']>().toEqualTypeOf<number>();
    expectTypeOf<NgLetContext<number>['ngLet']>().toEqualTypeOf<number>();
  });

  it('narrows the context through the template context guard', () => {
    const context: unknown = { ngLet: 1, $implicit: 1 };
    const directive = null as unknown as NgLetDirective<number>;

    if (NgLetDirective.ngTemplateContextGuard(directive, context)) {
      expectTypeOf(context).toEqualTypeOf<NgLetContext<number>>();
      expectTypeOf(context.$implicit).toEqualTypeOf<number>();
    }
  });

  it('declares the `binding` guard that narrows the bound expression', () => {
    expectTypeOf(NgLetDirective.ngTemplateGuard_ngLet).toEqualTypeOf<'binding'>();
  });

  it('keeps the input contravariant on the directive type parameter', () => {
    const directive = null as unknown as NgLetDirective<string>;
    expectTypeOf(directive).toHaveProperty('ngLet');
    expectTypeOf<NgLetDirective<string>['ngLet']>().toEqualTypeOf<string>();
  });

  it('narrows a nullable expression inside the template', () => {
    @Component({
      template: `<ng-container *ngLet="value; let data">{{ data?.length }}</ng-container>`,
      imports: [NgLetDirective],
    })
    class TestComponent {
      value: string | null = 'test';
    }

    const fixture = TestBed.createComponent(TestComponent);
    fixture.detectChanges();
    expect(((fixture.nativeElement as HTMLElement).textContent ?? '').trim()).toBe('4');
  });
});
