import {Directive, ViewContainerRef} from "@angular/core";

@Directive({
  selector: '[filterHost]'
})
export class FilterDirective {
  constructor(public viewContainerRef: ViewContainerRef) {
  }
}
