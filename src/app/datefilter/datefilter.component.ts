import { Component, OnInit } from '@angular/core';
import {ClrDatagridFilterInterface} from "@clr/angular";
import {BirthdayFilter} from "../home/home.component";

@Component({
  selector: 'app-datefilter',
  templateUrl: './datefilter.component.html',
  styleUrls: ['./datefilter.component.css']
})
export class DatefilterComponent implements OnInit {
  filter!: ClrDatagridFilterInterface<BirthdayFilter>;
  constructor() { }

  ngOnInit(): void {
  }

}
