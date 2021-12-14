import { Directive, Input, TemplateRef, ViewContainerRef } from '@angular/core';

interface NgLetContext<T> {
    ngLet: T;
    $implicit: T;
}

@Directive({
    // tslint:disable-next-line: directive-selector
    selector: '[ngLet]'
})
export class NgLetDirective<T> {
    
    private context: NgLetContext<T | null> = { ngLet: null, $implicit: null };
    private hasView: boolean = false;

    // eslint-disable-next-line no-unused-vars
    constructor(private viewContainer: ViewContainerRef, private templateRef: TemplateRef<NgLetContext<T>>) {}

    @Input()
    set ngLet(value: T) {
        this.context.$implicit = this.context.ngLet = value;
        if (!this.hasView) {
            this.viewContainer.createEmbeddedView(this.templateRef, this.context);
            this.hasView = true;
        }
    }
}
