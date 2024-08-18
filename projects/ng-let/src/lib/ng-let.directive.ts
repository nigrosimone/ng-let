import { Directive, Input, TemplateRef, ViewContainerRef } from '@angular/core';

interface NgLetContext<T> {
    /**
     * using `ngLet` to enable `as` syntax: `*ngLet="foo as bar"`
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

    constructor(viewContainer: ViewContainerRef, templateRef: TemplateRef<NgLetContext<T>>) {
        viewContainer.createEmbeddedView(templateRef, this.context)
    }

    @Input({ required: true })
    set ngLet(value: T) {
        this.context.$implicit = this.context.ngLet = value;
    }

    /** 
     * @internal 
     * Directives that behave like *ngIf can declare that they want the same treatment by including a 
     * static member marker that is a signal to the template compiler to treat them like *ngIf.
     * 
     * @see https://v17.angular.io/guide/aot-compiler#custom-ngif-like-directives
     */
    public static ngLetUseIfTypeGuard: void;

    /**
     * Assert the correct type of the expression bound to the `NgLet` input within the template.
     *
     * The presence of this static field is a signal to the Ivy template type check compiler that
     * when the `NgLet` structural directive renders its template, the type of the expression bound
     * to `NgLet` should be narrowed in some way. For `NgLet`, the binding expression itself is used to
     * narrow its type, which allows the strictNullChecks feature of TypeScript to work with `NgLet`.
     * 
     * @see https://angular.dev/guide/directives/structural-directives#typing-the-directives-context
     */
    static ngTemplateGuard_ngLet: 'binding';

    /**
     * Asserts the correct type of the context for the template that `NgLet` will render.
     *
     * The presence of this method is a signal to the Ivy template type-check compiler that the
     * `NgLet` structural directive renders its template with a specific context type.
     * 
     * @see https://angular.dev/guide/directives/structural-directives#typing-the-directives-context
     */
    static ngTemplateContextGuard<T>(_dir: NgLetDirective<T>, _ctx: unknown): _ctx is NgLetContext<T> {
        return true;
    }
}
