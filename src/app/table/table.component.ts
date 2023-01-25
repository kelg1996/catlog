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
import {ClrDatagridFilter, ClrDatagridFilterInterface, ClrDatagridStringFilterInterface} from "@clr/angular";
import {BuildInStringFilters} from "./BuildInFilters";
import {Todo} from "../home/home.component";
import {ColumnDirective} from "./ColumnDirective";
import {exportToExcel} from "./helper";


ClarityIcons.addIcons(angleIcon, stepForward2Icon);


@Component({
  selector: 'app-table',
  templateUrl: './table.component.html',
  styleUrls: ['./table.component.css'],
})
export class TableComponent implements OnInit, OnChanges, AfterViewInit{
  records: TableData<any> = [];
  tableColumns: TableColumns<any> = [];
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
  @ViewChildren(ColumnDirective) columnHosts!: QueryList<ColumnDirective>;
  constructor() { }

  handleClickExport() {
    let columns: string[] = [];
    this.columnHosts.forEach((item, index) => {
      const viewContainerRef = item.viewContainerRef;
      const dom = viewContainerRef.element.nativeElement;
      if (window.getComputedStyle(dom).display !== 'none') {
        columns.push(dom.dataset.name);
      }
    });

    const columnFilters = this.columns.filter(column => 'filter' in column).map(column => column?.filter);
    const filteredRecords = this.records.filter(record => {
      for (let filter of columnFilters) {
        let matched: boolean;
        if (filter?.component) {
          const f: ClrDatagridFilterInterface<any> = filter.filter as ClrDatagridFilterInterface<any>;
          matched = f.accepts(record);
        } else {
          const f: BuildInStringFilters<any> = filter?.filter as BuildInStringFilters<any>;
          matched = f.accepts(record, f.search);
        }
        if (!matched) {
          return false;
        }
      }
      return true;
    });
    const exportData = filteredRecords.map(record => {
      let data: any = {};
      for (let key of columns) {
        data[key] = record[key];
      }
      return data;
    });

    exportToExcel(exportData)
  }

  ngAfterViewInit() {
    const columnFilterComponents = this.columns
      .filter(column => column?.filter?.component)
      .map(column => column?.filter?.component);
    const columnFilters = this.columns
      .filter(column => column?.filter?.component)
      .map(column => column?.filter?.filter);

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

  handleColumns() {
    this.tableColumns = this.columns.map(column => {
      if (!column.filter) {
        column.filter = {
          filter: new BuildInStringFilters<any>((item: any, search: string) => {
            return new RegExp(`.*${search}.*`).test(String(item[column.key]))
          })
        }
      }
      return column;
    })
  }

  handleStringFilterChange(e: any, column: TableColumn<any>) {
    if (!column?.filter?.component) {
      const filter = this.getStringFilter(column) as BuildInStringFilters<any>;
      filter.search = e;
    }
  }

  getFilter(column: TableColumn<any>) {
    return column?.filter?.filter as ClrDatagridFilterInterface<any>;
  }

  getStringFilter( column: TableColumn<any>) {
    return column?.filter?.filter as ClrDatagridStringFilterInterface<any>;
  }

  onFilterChange(e: any) {
    console.log(e)
  }

  ngOnChanges(changes: SimpleChanges) {
    if (changes['tableData']) {
      this.refresh();
    }
    if (changes['columns']) {
      this.handleColumns();
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

}
