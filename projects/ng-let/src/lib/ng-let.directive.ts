import { Directive, Input, TemplateRef, ViewContainerRef } from '@angular/core';

/**
 * The context `*ngLet` renders its template with. It is part of the public API:
 * `ngTemplateContextGuard` narrows to it, so a consumer writing an explicit
 * `<ng-template>` needs to be able to name it.
 */
export interface NgLetContext<T> {
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
 * @description
 *
 * The `*ngLet` directive it's a Angular structural directive for sharing data as local variable into html component template.
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
@Directive({ selector: '[ngLet]', standalone: true })
export class NgLetDirective<T> {
  private readonly context: NgLetContext<T | null> = { ngLet: null, $implicit: null };

  // eslint-disable-next-line @angular-eslint/prefer-inject
  constructor(viewContainer: ViewContainerRef, templateRef: TemplateRef<NgLetContext<T>>) {
    viewContainer.createEmbeddedView(templateRef, this.context);
  }

  /**
   * @description
   *
   * The `*ngLet` directive it's a Angular structural directive for sharing data as local variable into html component template.
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
   */
  @Input({ required: true })
  set ngLet(value: T) {
    this.context.$implicit = this.context.ngLet = value;
  }

  /**
   * Asserts the correct type of the context for the template that `NgLet` will render.
   *
   * The presence of this method is a signal to the Ivy template type-check compiler that the
   * `NgLet` structural directive renders its template with a specific context type.
   *
   * @see https://angular.dev/guide/directives/structural-directives#typing-the-directives-context
   */
  static ngTemplateContextGuard<T>(
    _dir: NgLetDirective<T>,
    _ctx: unknown,
  ): _ctx is NgLetContext<T> {
    return true;
  }
}

/**
 * @deprecated import the standalone NgLetDirective
 */
export const NgLetModule = NgLetDirective;
