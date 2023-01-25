import {Directive, NgModule, ViewContainerRef} from '@angular/core';

import {TableComponent} from "./table.component";
import {ClarityModule} from "@clr/angular";
import {BrowserModule} from "@angular/platform-browser";
import {FilterDirective} from './FilterDirective';
import {ColumnDirective} from "./ColumnDirective";



@NgModule({
  declarations: [
    TableComponent,
    FilterDirective,
    ColumnDirective
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
