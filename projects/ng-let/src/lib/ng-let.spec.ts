import { Component, signal, WritableSignal } from '@angular/core';
import { TestBed, waitForAsync } from '@angular/core/testing';
import { BehaviorSubject, Observable, of } from 'rxjs';
import { NgLetDirective } from './ng-let.directive';
import { NgLetModule } from './ng-let.module';
import { CommonModule } from '@angular/common';


describe('NgLet', () => {

    it('should work in a template with as syntax', waitForAsync(() => {
        @Component({
            template: '<ng-container *ngLet="value as data">{{data}},{{data}}</ng-container>',
            standalone: true,
            imports: [NgLetModule],
        })
        class TestComponent {
            public value = 'test';
        }
        const fixture = TestBed.createComponent(TestComponent);
        fixture.detectChanges();
        expect(fixture.nativeElement.textContent).toContain('test,test');
    }));

    it('should work in a template with no value', waitForAsync(() => {
        @Component({
            template: '<ng-container *ngLet>test</ng-container>',
            standalone: true,
            imports: [NgLetModule],
        })
        class TestComponent { }
        const fixture = TestBed.createComponent(TestComponent);
        fixture.detectChanges();
        expect(fixture.nativeElement.textContent).toContain('test');
    }));

    it('should work in a template with implicit syntax', waitForAsync(() => {
        @Component({
            template: '<ng-container *ngLet="value; let data">{{data}},{{data}}</ng-container>',
            standalone: true,
            imports: [NgLetModule],
        })
        class TestComponent {
            public value = 'test';
        }
        const fixture = TestBed.createComponent(TestComponent);
        fixture.detectChanges();
        expect(fixture.nativeElement.textContent).toContain('test,test');
    }));

    it('should work in a template with async pipe', waitForAsync(() => {
        @Component({
            template: '<ng-container *ngLet="value | async; let data">{{data}},{{data}}</ng-container>',
            standalone: true,
            imports: [NgLetModule, CommonModule],
        })
        class TestComponent {
            public value: Observable<string> = of('test');
        }
        const fixture = TestBed.createComponent(TestComponent);
        fixture.detectChanges();
        expect(fixture.nativeElement.textContent).toContain('test,test');
    }));

    it('should work in a template with async pipe and change', waitForAsync(() => {
        @Component({
            template: '<ng-container *ngLet="value | async; let data">{{data}},{{data}}</ng-container>',
            standalone: true,
            imports: [NgLetModule, CommonModule],
        })
        class TestComponent {
            public subject = new BehaviorSubject('test')
            public value: Observable<string> = this.subject.asObservable();
        }
        const fixture = TestBed.createComponent(TestComponent);
        fixture.detectChanges();
        expect(fixture.nativeElement.textContent).toContain('test,test');
        (fixture.debugElement.componentInstance as TestComponent).subject.next('test2');
        fixture.detectChanges();
        expect(fixture.nativeElement.textContent).toContain('test2,test2');
    }));

    it('should work in a template with signal', waitForAsync(() => {
        @Component({
            template: '<ng-container *ngLet="value(); let data">{{data}},{{data}}</ng-container>',
            standalone: true,
            imports: [NgLetModule],
        })
        class TestComponent {
            public value: WritableSignal<string> = signal('test');
        }
        const fixture = TestBed.createComponent(TestComponent);
        fixture.detectChanges();
        expect(fixture.nativeElement.textContent).toContain('test,test');
    }));

    it('should work in a template with signal and change', waitForAsync(() => {
        @Component({
            template: '<ng-container *ngLet="value(); let data">{{data}},{{data}}</ng-container>',
            standalone: true,
            imports: [NgLetModule],
        })
        class TestComponent {
            public value: WritableSignal<string> = signal('test');
        }
        const fixture = TestBed.createComponent(TestComponent);
        fixture.detectChanges();
        expect(fixture.nativeElement.textContent).toContain('test,test');
        (fixture.debugElement.componentInstance as TestComponent).value.set('test2');
        fixture.detectChanges();
        expect(fixture.nativeElement.textContent).toContain('test2,test2');
    }));

    it('should work in a template with nested directive', waitForAsync(() => {
        @Component({
            template: `<ng-container *ngLet="parent; let parentData"
        >{{ parentData }},<ng-container *ngLet="child; let childData">{{
          child
        }}</ng-container></ng-container
      >`,
            standalone: true,
            imports: [NgLetModule],
        })
        class TestComponent {
            public parent = 'parent';
            public child = 'child';
        }
        const fixture = TestBed.createComponent(TestComponent);
        fixture.detectChanges();
        expect(fixture.nativeElement.textContent).toContain('parent,child');
    }));

    it('ngTemplateContextGuard should return true', () => {
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        expect(NgLetDirective.ngTemplateContextGuard(null as any, null)).toBeTrue();
    });

    it('should create NgLetModule', () => {
        expect(new NgLetModule()).toBeTruthy();
    });
});

