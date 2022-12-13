import {Directive, NgModule, ViewContainerRef} from '@angular/core';

import {TableComponent} from "./table.component";
import {ClarityModule} from "@clr/angular";
import {BrowserModule} from "@angular/platform-browser";
import {FilterDirective} from './FilterDirective';


@NgModule({
  declarations: [
    TableComponent,
    FilterDirective
  ],
  imports: [
    ClarityModule,
    BrowserModule
  ],
  exports: [
    TableComponent,
    FilterDirective
  ],
  bootstrap: [
  ]
})
export class TableModule { }
