import { Component, OnInit } from '@angular/core';
import {TableColumns, TableData} from "../table/table.types";
import { faker } from '@faker-js/faker';
import {Observable, Subject} from "rxjs";
import {HttpClient} from "@angular/common/http";
import {ClrDatagridFilterInterface} from "@clr/angular";

interface Person {
  id: string;
  age: number;
  firstname: string;
  lastname: string;
  address: string;
  introduction: string;
}

const mockApi: () => Observable<{total: number,
  data: Person[],
  page: number}> = () => {
  return new Observable(ob => {
    const persons = [];
    const total = 1012;
    const page = 1;
    for (let i = 0; i < 1012; i ++) {
      persons.push({
        id: faker.datatype.uuid(),
        age: Math.ceil(10 + Math.random() * 40),
        firstname: faker.name.firstName(),
        lastname: faker.name.lastName(),
        address: faker.address.streetAddress(),
        introduction: faker.hacker.phrase()
      })
    }
    ob.next({
      total: total,
      data: persons,
      page: Number(page)
    })
  })
}

export  class AgeFilter implements ClrDatagridFilterInterface<Person> {
  changes = new Subject<any>;
  value = '';
  accepts(item: Person): boolean {
    return item.age > Number(this.value);
  }

  isActive(): boolean {
    return this.value.length > 0;
  }

}

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
  columns: TableColumns<Person> = [
    {
      title: 'ID',
      key: 'id'
    },
    {
      title: 'Age',
      key: 'age',
      filter: new AgeFilter()
    },
    {
      title: 'First name',
      key: 'firstname'
    },
    {
      title: 'Last name',
      key: 'lastname'
    },
    {
      title: 'Address',
      key: 'address',
      render: (p) => {
        return `<p class="bg-red">${p.address}</p>`
      }
    },
    {
      title: 'Introduction',
      key: 'introduction',
    },
  ];
  tableData: TableData<Person> | Observable<TableData<Person>> = [];
  page = 1;
  pageSize = 10;
  total = 1000;
  constructor(private httpClient: HttpClient) { }


  renderExpand(p: Person) {
    return `
      <pre class="bg-red">${p.address + p.introduction}</pre>
    `
  }

  handlePageChange(page: number) {
    this.page = page;
    this.requestApi();
  }

  requestApi() {
    mockApi()
      .subscribe((result) => {
        this.total = result.total;
        this.tableData = result.data;
      })

  }

  ngOnInit(): void {
    this.requestApi();
  }

}
