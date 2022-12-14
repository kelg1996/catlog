import {
  Component,
  EventEmitter,
  Input,
  OnChanges,
  OnInit,
  Output,
  AfterViewInit,
  SimpleChanges, Type,
  ViewChild, ViewContainerRef, ViewChildren, QueryList
} from '@angular/core';
import {TableColumn, TableColumns, TableData} from "./table.types";
import {Observable} from "rxjs";
import '@cds/core/icon/register.js';
import { ClarityIcons, angleIcon, stepForward2Icon } from '@cds/core/icon';

import {FilterDirective} from "./FilterDirective";
import {ClrDatagridFilter, ClrDatagridFilterInterface} from "@clr/angular";
ClarityIcons.addIcons(angleIcon, stepForward2Icon);
@Component({
  selector: 'app-table',
  templateUrl: './table.component.html',
  styleUrls: ['./table.component.css'],
})
export class TableComponent implements OnInit, OnChanges, AfterViewInit{
  records: TableData<any> = [];
  pageValue: number | string = 1;
  selected: any[] = [];
  @Input() expandRowRender: Function | undefined;
  @Input() columns: TableColumns<any> = [];
  @Input() tableData: TableData<any> | Observable<TableData<any>> = [];
  @Input() page: number = 1;
  @Input() pageSize: number = 10;
  @Input() total: number = 0;
  @Output() onPageChange = new EventEmitter<number>();
  @ViewChildren(FilterDirective) filterHosts!: QueryList<FilterDirective>;
  constructor(private excelService:ExcelService) { }

  ngAfterViewInit() {
    // child is set
    const columnFilterComponents = this.columns.filter(column => 'filter' in column).map(column => column?.filter?.component);
    const columnFilters = this.columns.filter(column => 'filter' in column).map(column => column?.filter?.filter);
    this.filterHosts.forEach((filterDirective, index: number) => {
      const viewContainerRef = filterDirective.viewContainerRef;
      viewContainerRef.clear();
      const componentRef = viewContainerRef.createComponent(columnFilterComponents[index] as Type<any>);
      componentRef.instance.filter = columnFilters[index];
    })
  }
  refresh() {
    if (Array.isArray(this.tableData)) {
      this.records = this.tableData;
    } else {
      this.tableData.subscribe(data => {
        this.records = data;
      })
    }
  }

  getFilter(column: TableColumn<any>) {
    return column?.filter?.filter as ClrDatagridFilterInterface<any>;
  }

  ngOnChanges(changes: SimpleChanges) {
    if (changes['tableData']) {
      this.refresh();
    }
  }

  ngOnInit(): void {
    this.refresh();
  }

  get pageNumber() {
    return Number(this.pageValue);
  }

  get totalPage() {
    return Math.ceil(this.total / this.pageSize);
  }

  handleEnterKey(e: any) {
    this.onPageChange.emit(Number(this.pageValue));
  }

  handleClickPrevPage() {
    let page = Number(this.pageValue);
    if (page > 1) {
      this.pageValue = page - 1;
    }
    this.onPageChange.emit(Number(this.pageValue));
  }

  handleClickNextPage() {
    let page = Number(this.pageValue);
    if (page < this.totalPage) {
      this.pageValue = page + 1;
    }
    console.log(this.pageValue)
    this.onPageChange.emit(Number(this.pageValue));
  }

  handleClickFirstPage() {
    this.pageValue = 1;
    this.onPageChange.emit(Number(this.pageValue));
  }

  handleClickLastPage() {
    this.pageValue = this.totalPage;
    this.onPageChange.emit(Number(this.pageValue));
  }

  handleEnterPage(e: any) {
    const val = e.target.value;
    if (!/[^0-9]/.test(val)) {
      let page = Number(val);
      if (page === 0) {
        page = 1;
      }
      this.pageValue = page;
    } else {
      e.target.value = this.pageValue;
    }
  }

  renderValue(column: TableColumn<any>, record: any) {
    if (column.render) {
      return column.render(record);
    }
    return record[column.key];
  }

  getStringKey(key: any) {
    return String(key);
  }

showTCExportMenu=false
  showTEExportMenu=false
  exportAsXLSX(data, name, reimport=false):void {
    let table = data

    reimport? null: table.forEach(
                    table => { table.justification? table.justification = table.justification.replace(/<\/?(?!a)\w*\b[^>]*>/ig, ''): null,
                              table.evidence?  table.evidence = table.evidence.replace(/<\/?(?!a)\w*\b[^>]*>/ig, ''): null,
                              delete table.id, delete table.log
                              })


    // execu ? this.getTestExecu(this.uuid): this.getTestCat(this.uuid)

    this.excelService.exportAsExcelFile(table, name);
    this.showTCExportMenu=false
    this.showTEExportMenu=false
}
