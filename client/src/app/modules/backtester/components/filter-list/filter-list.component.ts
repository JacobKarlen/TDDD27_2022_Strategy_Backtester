import { Component, OnInit } from '@angular/core';

import { CdkDragDrop, moveItemInArray } from '@angular/cdk/drag-drop';


@Component({
  selector: 'app-filter-list',
  templateUrl: './filter-list.component.html',
  styleUrls: ['./filter-list.component.scss']
})
export class FilterListComponent implements OnInit {

  filters: number[] = [1];

  constructor() { }

  ngOnInit(): void {
  }

  addFilter() {
    console.log("add filter")
    this.filters.push(this.filters.length + 1)
  }

  drop(event: CdkDragDrop<number[]>) {
    moveItemInArray(this.filters, event.previousIndex, event.currentIndex);
  }

  deleteFilter(filterNumber: number) {
    console.log(filterNumber)
    let i = this.filters.indexOf(filterNumber)
    if (i !== -1) this.filters.splice(i, 1)
  }

}
