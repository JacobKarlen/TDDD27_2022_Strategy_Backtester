import { isNgTemplate } from '@angular/compiler';
import { Component, OnInit, Input, ViewChild } from '@angular/core';
import { AbstractControl, FormControl, FormGroup, ValidationErrors, ValidatorFn, Validators } from '@angular/forms';
import { MatOption } from '@angular/material/core';
import { MatSelect } from '@angular/material/select';

@Component({
  selector: 'app-backtester-form',
  templateUrl: './backtester-form.component.html',
  styleUrls: ['./backtester-form.component.scss']
})
export class BacktesterFormComponent implements OnInit {
  @Input() markets = [];
  @ViewChild('marketsSelect') marketsSelect: MatSelect;
  
  allMarketsSelected: boolean = false;

  backtesterForm = new FormGroup({
    'username': new FormControl('', [ 
      Validators.required, 
      Validators.minLength(4),
      Validators.pattern("^[a-zA-Z0-9]*$") 
    ]),
  })


  constructor() { }

  ngOnInit(): void {
  }

  onSubmit() {
    console.log("in submit function")
  }

  toggleAllMarketsSelection() {
    if (this.allMarketsSelected) {
      this.marketsSelect.options.forEach((opt: MatOption) => opt.select());
    } else {
      this.marketsSelect.options.forEach((opt: MatOption) => opt.deselect());
    }
  }
  marketOptionClicked() {
    let hasChanged = true;
    this.marketsSelect.options.forEach((opt: MatOption) => {
      if (!opt.selected) {
        hasChanged = false;
      }
    })
    this.allMarketsSelected = hasChanged
  }

}
