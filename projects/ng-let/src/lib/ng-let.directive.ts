import { Directive, Input, TemplateRef, ViewContainerRef } from '@angular/core';

interface NgLetContext<T> {
    /**
     * using `ngrxLet` to enable `as` syntax: `*ngLet="foo as bar"`
     */
    ngLet: T;
    /**
     * using `$implicit` to enable `let` syntax: `*ngLet="foo; let bar"`
     */
    $implicit: T;
}

/**
 * @ngModule NgLetModule
 *
 * @description
 *
 * The `*ngLet` directive it's a Angular structural directive for sharing data as local variable into html component template..
 *
 * @usageNotes
 *
 * ### Usage
 *
 * ```html
 * <ng-container *ngLet="(num1 + num2); let total"> <!-- single computation -->
 *    <div>
 *       1: {{ total }}
 *     </div>
 *     <div>
 *       2: {{ total }}
 *     </div>
 * </ng-container> 
 * ```
 *
 * @publicApi
 */
@Directive({
    selector: '[ngLet]'
})
export class NgLetDirective<T> {

    private context: NgLetContext<T | null> = { ngLet: null, $implicit: null };
    private hasView: boolean = false;

    // eslint-disable-next-line no-unused-vars
    constructor(private viewContainer: ViewContainerRef, private templateRef: TemplateRef<NgLetContext<T>>) { }

    @Input()
    set ngLet(value: T) {
        this.context.$implicit = this.context.ngLet = value;
        if (!this.hasView) {
            this.hasView = true;
            this.viewContainer.createEmbeddedView(this.templateRef, this.context);
        }
    }

    /** @internal */
    public static ngLetUseIfTypeGuard: void;

    /**
     * Assert the correct type of the expression bound to the `NgLet` input within the template.
     *
     * The presence of this static field is a signal to the Ivy template type check compiler that
     * when the `NgLet` structural directive renders its template, the type of the expression bound
     * to `NgLet` should be narrowed in some way. For `NgLet`, the binding expression itself is used to
     * narrow its type, which allows the strictNullChecks feature of TypeScript to work with `NgLet`.
     */
    static ngTemplateGuard_ngLet: 'binding';

    /**
     * Asserts the correct type of the context for the template that `NgLet` will render.
     *
     * The presence of this method is a signal to the Ivy template type-check compiler that the
     * `NgLet` structural directive renders its template with a specific context type.
     */
    static ngTemplateContextGuard<T>(dir: NgLetDirective<T>, ctx: any): ctx is NgLetContext<Exclude<T, false | 0 | '' | null | undefined>> {
        return true;
    }
}
