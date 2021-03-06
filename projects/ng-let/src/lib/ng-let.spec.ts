import { Component, DebugElement } from '@angular/core';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { Observable, of } from 'rxjs';
import { NgLetModule } from './ng-let.module';

@Component({ template: '<div *ngLet="value as data">{{data}}</div>' })
class TestSimpleComponent {
    value = 'test';
}
describe('NgLet: simple', () => {

    let fixture: ComponentFixture<TestSimpleComponent>;
    let debugElement: DebugElement;
    let element: HTMLElement;

    beforeEach(() => {
        TestBed.configureTestingModule({
            declarations: [TestSimpleComponent],
            imports: [NgLetModule]
        });
        fixture = TestBed.createComponent(TestSimpleComponent);
        debugElement = fixture.debugElement;
        element = debugElement.nativeElement;
    });

    afterEach(() => {
        document.body.removeChild(element);
    });

    it('test', () => {
        fixture.detectChanges();
        expect(element.textContent).toBe('test');
    });
});

@Component({ template: '<div *ngLet="value | async as data">{{data}}</div>' })
class TestAsyncComponent {
    value: Observable<string> = of('test');
}
describe('NgLet: async', () => {

    let fixture: ComponentFixture<TestAsyncComponent>;
    let debugElement: DebugElement;
    let element: HTMLElement;

    beforeEach(() => {
        TestBed.configureTestingModule({
            declarations: [TestAsyncComponent],
            imports: [NgLetModule]
        });
        fixture = TestBed.createComponent(TestAsyncComponent);
        debugElement = fixture.debugElement;
        element = debugElement.nativeElement;
    });

    afterEach(() => {
        document.body.removeChild(element);
    });

    it('test', () => {
        fixture.detectChanges();
        expect(element.textContent).toBe('test');
    });
});

// tslint:disable-next-line: max-line-length
@Component({ template: '<div *ngLet="value as data"><ng-container *ngLet="nestedValue as nestedData">{{data}}-{{nestedData}}</ng-container></div>' })
class TestNestedComponent {
    value = 'test';
    nestedValue = 'testNested';
}
describe('NgLet: nested', () => {

    let fixture: ComponentFixture<TestNestedComponent>;
    let debugElement: DebugElement;
    let element: HTMLElement;

    beforeEach(() => {
        TestBed.configureTestingModule({
            declarations: [TestNestedComponent],
            imports: [NgLetModule]
        });
        fixture = TestBed.createComponent(TestNestedComponent);
        debugElement = fixture.debugElement;
        element = debugElement.nativeElement;
    });

    afterEach(() => {
        document.body.removeChild(element);
    });

    it('test', () => {
        fixture.detectChanges();
        expect(element.textContent).toBe('test-testNested');
    });
});

describe('NgLetModule', () => {
    it('should create NgLetModule', () => {
        expect(new NgLetModule()).toBeTruthy();
    });
});
