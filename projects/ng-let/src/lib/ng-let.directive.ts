import { Directive, Input, TemplateRef, ViewContainerRef } from '@angular/core';

interface NgLetContext<T> {
    ngLet: T;
}

@Directive({
    selector: '[ngLet]'
})
export class NgLetDirective<T> {
    private _context: NgLetContext<T> = { ngLet: null };

    constructor(_viewContainer: ViewContainerRef, _templateRef: TemplateRef<NgLetContext<T>>) {
        _viewContainer.createEmbeddedView(_templateRef, this._context);
    }

    @Input()
    set ngLet(value: T) {
        this._context.ngLet = value;
    }
}