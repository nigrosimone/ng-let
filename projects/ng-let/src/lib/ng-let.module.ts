import { NgModule } from '@angular/core';
import { NgLetDirective } from './ng-let.directive';

@NgModule({
  declarations: [NgLetDirective],
  exports: [NgLetDirective]
})
export class NgLetModule { }
