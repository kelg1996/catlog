import {ClrDatagridFilterInterface, ClrDatagridStringFilterInterface} from "@clr/angular";
import { Type } from "@angular/core";

export type ColumnFilter<T> = {
  filter: ClrDatagridStringFilterInterface<T> | ClrDatagridFilterInterface<T>;
  component?: Type<any>;
}

export type TableColumn<T> = {
  title: string;
  key: keyof T;
  render?: (record: T) => any;
  filter?: ColumnFilter<T>;
}
export type TableColumns<T> = Array<TableColumn<T>>;

export type TableData<T> = Array<T>;





