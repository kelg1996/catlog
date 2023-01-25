import { ClrDatagridStringFilterInterface} from "@clr/angular";

export class BuildInStringFilters<T> implements ClrDatagridStringFilterInterface<T> {

  search = '';
  constructor(accepts: (_item: T, _search: string) => boolean) {
    this.accepts = (item: T, search: string) => {
      this.search = search;
      return accepts(item, search);
    }
  }
  accepts(item: T, search: string): boolean {
    return false;
  }
}
