import { Component, OnInit } from '@angular/core';
import {ClrDatagridFilterInterface} from "@clr/angular";
import {AgeFilter} from "../home/home.component";

@Component({
  selector: 'app-agefilter',
  templateUrl: './agefilter.component.html',
  styleUrls: ['./agefilter.component.css']
})
export class AgefilterComponent implements OnInit {
  filter!: ClrDatagridFilterInterface<AgeFilter>;
  constructor() { }

  ngOnInit(): void {
  }
  handleInputMin(e: any) {
    console.log(this.filter)
  }
  handleInputMax(e: any) {

  }
}

