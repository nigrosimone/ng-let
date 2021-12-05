import { Directive, Input, TemplateRef, ViewContainerRef } from '@angular/core';

interface NgLetContext<T> {
    ngLet: T;
}

@Directive({
    // tslint:disable-next-line: directive-selector
    selector: '[ngLet]'
})
export class NgLetDirective<T> {
    private context: NgLetContext<T | null> = { ngLet: null };

    constructor(viewContainer: ViewContainerRef, templateRef: TemplateRef<NgLetContext<T>>) {
        viewContainer.createEmbeddedView(templateRef, this.context);
    }

    @Input()
    set ngLet(value: T) {
        this.context.ngLet = value;
    }
}
