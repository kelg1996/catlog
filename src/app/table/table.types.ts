import {ClrDatagridFilterInterface} from "@clr/angular";

export type TableColumn<T> = {
  title: string;
  key: keyof T;
  render?: (record: T) => any;
  filter?: ClrDatagridFilterInterface<T>;
}
export type TableColumns<T> = Array<TableColumn<T>>;

export type TableData<T> = Array<T>;



