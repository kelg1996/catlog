import {Component, EventEmitter, Input, OnChanges, OnInit, Output, SimpleChanges} from '@angular/core';
import {TableColumn, TableColumns, TableData} from "./table.types";
import {Observable} from "rxjs";
import '@cds/core/icon/register.js';
import { ClarityIcons, angleIcon, stepForward2Icon } from '@cds/core/icon';
import {ClrDatagridFilterInterface} from "@clr/angular";
import {AgeFilter} from "../home/home.component";
ClarityIcons.addIcons(angleIcon, stepForward2Icon);
@Component({
  selector: 'app-table',
  templateUrl: './table.component.html',
  styleUrls: ['./table.component.css'],
})
export class TableComponent implements OnInit, OnChanges{
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
  constructor() { }

  refresh() {
    if (Array.isArray(this.tableData)) {
      this.records = this.tableData;
    } else {
      this.tableData.subscribe(data => {
        this.records = data;
      })
    }
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

}
