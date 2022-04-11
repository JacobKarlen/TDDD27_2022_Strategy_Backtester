import { Component, OnInit, EventEmitter, QueryList, ViewChildren, Output } from '@angular/core';

import { CdkDragDrop, moveItemInArray } from '@angular/cdk/drag-drop';
import { FormControl, FormGroup } from '@angular/forms';
import { FilterComponent } from '../filter/filter.component';

@Component({
  selector: 'app-filter-list',
  templateUrl: './filter-list.component.html',
  styleUrls: ['./filter-list.component.scss']
})
export class FilterListComponent implements OnInit {
  @ViewChildren('filter') filterComps!: QueryList<FilterComponent>;
  @Output() filterOrderEvent = new EventEmitter<number[]>();

  filtersFormGroup = new FormGroup({})
  filterCounter: number = 0; // track next filter id
  filters: number[] = []; // track filter order

  constructor() { }

  ngOnInit(): void { this.addFilter() }

  ngAfterViewInit() { }

  getFiltersFormGroup(): FormGroup {
    // used by parent to add form group to form
    return this.filtersFormGroup;
  }

  addFilter() {
    this.filters.push(this.filterCounter++)
    this.filterOrderEvent.emit(this.filters)

    setTimeout(() => {
      // delay adding control to wait for FilterComponents to rerender
      // might change to ng lc-hook later
      this.filterComps.forEach((fc: FilterComponent) => {
        this.filtersFormGroup.addControl('filter'+fc.getFilterNumber(), fc.getFilterForm())
      })
    }, 500) 
  }

  removeFilter(filterNumber: number) {
    let i: number = this.filters.indexOf(filterNumber)
    if (i !== -1) {
      this.filters.splice(i, 1)
      this.filtersFormGroup.removeControl('filter'+filterNumber)
    }
  }

  drop(event: CdkDragDrop<number[]>) {
    moveItemInArray(this.filters, event.previousIndex, event.currentIndex);
  }


}
