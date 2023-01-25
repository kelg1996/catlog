import {Directive, ViewContainerRef} from "@angular/core";

@Directive({
  selector: '[columnHost]'
})
export class ColumnDirective {
  constructor(public viewContainerRef: ViewContainerRef) {
  }
}
