import { AsyncPipe } from '@angular/common';
import { ChangeDetectionStrategy, Component, signal, WritableSignal } from '@angular/core';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { BehaviorSubject, Observable, of } from 'rxjs';

import { NgLetDirective, NgLetModule } from '../public-api';

const text = (fixture: ComponentFixture<unknown>): string =>
  ((fixture.nativeElement as HTMLElement).textContent ?? '').trim();

describe('NgLetDirective', () => {
  describe('binding syntaxes', () => {
    it('exposes the value through the `as` syntax', () => {
      @Component({
        template: '<ng-container *ngLet="value as data">{{ data }},{{ data }}</ng-container>',
        imports: [NgLetDirective],
      })
      class TestComponent {
        value = 'test';
      }

      const fixture = TestBed.createComponent(TestComponent);
      fixture.detectChanges();
      expect(text(fixture)).toBe('test,test');
    });

    it('exposes the value through the `let` syntax', () => {
      @Component({
        template: '<ng-container *ngLet="value; let data">{{ data }},{{ data }}</ng-container>',
        imports: [NgLetDirective],
      })
      class TestComponent {
        value = 'test';
      }

      const fixture = TestBed.createComponent(TestComponent);
      fixture.detectChanges();
      expect(text(fixture)).toBe('test,test');
    });

    it('exposes the same value under `$implicit` and under `ngLet`', () => {
      @Component({
        template:
          '<ng-container *ngLet="value; let implicit; ngLet as named">{{ implicit }}|{{ named }}</ng-container>',
        imports: [NgLetDirective],
      })
      class TestComponent {
        value = 'test';
      }

      const fixture = TestBed.createComponent(TestComponent);
      fixture.detectChanges();
      expect(text(fixture)).toBe('test|test');
    });

    it('works through the deprecated NgLetModule alias', () => {
      @Component({
        template: '<ng-container *ngLet="value as data">{{ data }},{{ data }}</ng-container>',
        imports: [NgLetModule],
      })
      class TestComponent {
        value = 'test';
      }

      const fixture = TestBed.createComponent(TestComponent);
      fixture.detectChanges();
      expect(text(fixture)).toBe('test,test');
    });

    it('is the very same symbol as the directive', () => {
      expect(NgLetModule).toBe(NgLetDirective);
    });

    it('renders with no expression at all, the static attribute standing in for the input', () => {
      @Component({
        template: '<ng-container *ngLet>test</ng-container>',
        imports: [NgLetDirective],
      })
      class TestComponent {}

      const fixture = TestBed.createComponent(TestComponent);
      fixture.detectChanges();
      expect(text(fixture)).toBe('test');
    });
  });

  describe('falsy values', () => {
    // The whole point of *ngLet: unlike *ngIf it renders whatever it is given.
    @Component({
      template: '<ng-container *ngLet="value; let data">[{{ data }}]</ng-container>',
      imports: [NgLetDirective],
    })
    class TestComponent {
      value: unknown = null;
    }

    const cases: [label: string, value: unknown, rendered: string][] = [
      ['zero', 0, '[0]'],
      ['an empty string', '', '[]'],
      ['false', false, '[false]'],
      ['null', null, '[]'],
      ['undefined', undefined, '[]'],
      ['NaN', Number.NaN, '[NaN]'],
    ];

    for (const [label, value, rendered] of cases) {
      it(`renders the template when the value is ${label}`, () => {
        const fixture = TestBed.createComponent(TestComponent);
        fixture.componentInstance.value = value;
        fixture.detectChanges();
        expect(text(fixture)).toBe(rendered);
      });
    }
  });

  describe('reactivity', () => {
    it('follows a signal', () => {
      @Component({
        template: '<ng-container *ngLet="value(); let data">{{ data }},{{ data }}</ng-container>',
        imports: [NgLetDirective],
        changeDetection: ChangeDetectionStrategy.OnPush,
      })
      class TestComponent {
        value: WritableSignal<string> = signal('test');
      }

      const fixture = TestBed.createComponent(TestComponent);
      fixture.detectChanges();
      expect(text(fixture)).toBe('test,test');

      fixture.componentInstance.value.set('test2');
      fixture.detectChanges();
      expect(text(fixture)).toBe('test2,test2');
    });

    it('follows an observable through the async pipe', () => {
      @Component({
        template:
          '<ng-container *ngLet="value | async; let data">{{ data }},{{ data }}</ng-container>',
        imports: [NgLetDirective, AsyncPipe],
        changeDetection: ChangeDetectionStrategy.OnPush,
      })
      class TestComponent {
        subject = new BehaviorSubject('test');
        value: Observable<string> = this.subject.asObservable();
      }

      const fixture = TestBed.createComponent(TestComponent);
      fixture.detectChanges();
      expect(text(fixture)).toBe('test,test');

      fixture.componentInstance.subject.next('test2');
      fixture.detectChanges();
      expect(text(fixture)).toBe('test2,test2');
    });

    it('works with a synchronous observable', () => {
      @Component({
        template:
          '<ng-container *ngLet="value | async; let data">{{ data }},{{ data }}</ng-container>',
        imports: [NgLetDirective, AsyncPipe],
      })
      class TestComponent {
        value: Observable<string> = of('test');
      }

      const fixture = TestBed.createComponent(TestComponent);
      fixture.detectChanges();
      expect(text(fixture)).toBe('test,test');
    });
  });

  describe('single evaluation', () => {
    // The reason the directive exists: the source expression is read once and
    // reused, instead of once per place the value appears in the template.
    @Component({
      template:
        '<ng-container *ngLet="value; let data">{{ data }}{{ data }}{{ data }}</ng-container>',
      imports: [NgLetDirective],
    })
    class WithNgLet {
      reads = 0;
      get value(): string {
        this.reads++;
        return 'x';
      }
    }

    @Component({
      template: '{{ value }}{{ value }}{{ value }}',
    })
    class WithoutNgLet {
      reads = 0;
      get value(): string {
        this.reads++;
        return 'x';
      }
    }

    it('reads the bound expression once however many times the alias is used', () => {
      const withDirective = TestBed.createComponent(WithNgLet);
      withDirective.detectChanges();
      const plain = TestBed.createComponent(WithoutNgLet);
      plain.detectChanges();

      expect(text(withDirective)).toBe('xxx');
      expect(text(plain)).toBe('xxx');
      // same rendering, a third of the reads
      expect(plain.componentInstance.reads).toBe(withDirective.componentInstance.reads * 3);
    });
  });

  describe('nesting', () => {
    it('keeps an inner scope separate from the outer one', () => {
      @Component({
        template: `<ng-container *ngLet="parent; let data"
          >{{ data }},<ng-container *ngLet="child; let data">{{ data }}</ng-container
          >,{{ data }}</ng-container
        >`,
        imports: [NgLetDirective],
      })
      class TestComponent {
        parent = 'parent';
        child = 'child';
      }

      const fixture = TestBed.createComponent(TestComponent);
      fixture.detectChanges();
      expect(text(fixture)).toBe('parent,child,parent');
    });

    it('renders the template exactly once', () => {
      @Component({
        template: '<span *ngLet="value; let data">{{ data }}</span>',
        imports: [NgLetDirective],
      })
      class TestComponent {
        value = 'test';
      }

      const fixture = TestBed.createComponent(TestComponent);
      fixture.detectChanges();
      expect((fixture.nativeElement as HTMLElement).querySelectorAll('span')).toHaveLength(1);
    });
  });

  describe('template type guards', () => {
    it('accepts any context, the narrowing is done at compile time', () => {
      expect(NgLetDirective.ngTemplateContextGuard(null as never, null)).toBe(true);
      expect(NgLetDirective.ngTemplateContextGuard(null as never, { $implicit: 1, ngLet: 1 })).toBe(
        true,
      );
    });

    it('declares no *ngIf-like narrowing marker', () => {
      // Both of these tell the compiler the bound expression is truthy inside the
      // template. *ngLet always renders, so neither may be declared.
      expect('ngTemplateGuard_ngLet' in NgLetDirective).toBe(false);
      expect('ngLetUseIfTypeGuard' in NgLetDirective).toBe(false);
    });
  });
});
