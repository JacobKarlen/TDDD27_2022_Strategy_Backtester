import { Component, Input, OnInit, ViewChild } from '@angular/core';
import { FormControlName, FormGroup } from '@angular/forms';
import { MatOption } from '@angular/material/core';
import { MatSelect } from '@angular/material/select';

@Component({
  selector: 'multiple-select',
  templateUrl: './multiple-select.component.html',
  styleUrls: ['./multiple-select.component.scss']
})
export class MultipleSelectComponent implements OnInit {
  @Input() controlName: string = '';
  @Input() formGroup!: FormGroup;
  @Input() label: string = '';
  @Input() values: object[] = [];
  @Input() options: string[] = [];
  @ViewChild('select') select!: MatSelect;

  allSelected: boolean = false;

  constructor() { }

  ngOnInit(): void { }

  toggleAllSelection() {
    // toggle all selection, activated with separate checkbox
    if (this.allSelected) {
      this.select.options.forEach((opt: MatOption) => opt.select());
    } else {
      this.select.options.forEach((opt: MatOption) => opt.deselect());
    }
  }
  optionClicked() {
    // update 'all selected'-status when an option is unselected
    let hasChanged = true;
    this.select.options.forEach((opt: MatOption) => {
      if (!opt.selected) {
        hasChanged = false;
      }
    })
    this.allSelected = hasChanged
  }

}
