import { Component, Input, OnInit, Output, EventEmitter } from '@angular/core';
import { AbstractControl, FormControl, FormGroup, ValidationErrors, ValidatorFn } from '@angular/forms';
import { subscribeOn } from 'rxjs/operators';

import { create, all } from 'mathjs';

import { kpis } from 'src/app/shared/data/kpis';
import { MatDialog } from '@angular/material/dialog';
import { KPISelectorModalComponent } from '../kpiselector-modal/kpiselector-modal.component';

interface Scope {
  [key: string]: any
}

@Component({
  selector: 'app-filter',
  templateUrl: './filter.component.html',
  styleUrls: ['./filter.component.scss']
})
export class FilterComponent implements OnInit {
  @Input() filterNumber!: number;
  @Output() filterDeleteEvent = new EventEmitter<number>()
    
  math = create(all, {})
  scope: Scope = { // scope used to evaluate filter formulas
    'RANK': function(val: number) {
      return val
    }
  }

  FormulaValidator: ValidatorFn = (control: AbstractControl): ValidationErrors | null => {
    /**
     * Custom validator function to validate filter formula based on kpis and functions in scope
     */
    let formula = control.parent?.get('formula')?.value
    try {
      return this.math.evaluate(formula, this.scope) != NaN ? null : { formulaError: "invalid filter formula." }
    } catch (e: any) {
      return { formulaError: e.message }
    }
  }

  constructor(public dialog: MatDialog) { }

  ngOnInit(): void {
    /**
    * add kpi abbreviations to math scope, value 10 is arbitrary
    * since we won't evaluate anything more than that the formula is
    * valid and therefore not a NaN.
    */
    kpis.forEach((kpi: any) => { this.scope[kpi.abbreviation] = 10 })
  }

  filterForm: FormGroup = new FormGroup({
    'selectionCriteria': new FormControl('', [ ]),
    'numberOfStocks': new FormControl('', []),
    'minFilterValue': new FormControl('', []),
    'maxFilterValue': new FormControl('', []),
    'formula': new FormControl('', [ this.FormulaValidator ])
  })

  getFilterForm(): FormGroup {
    return this.filterForm
  }

  getFilterNumber(): number {
    return this.filterNumber;
  }

  openDialog(): void {
    const dialogRef = this.dialog.open(KPISelectorModalComponent, {
      width: '600px',
      height: '600px'
    });

    dialogRef.afterClosed().subscribe((kpiAbbreviation: string) => {
      // add selected kpi shorthand to formula and give back focus
      if (kpiAbbreviation !== undefined) {
        this.filterForm.get('formula')?.setValue(
          this.filterForm.get('formula')?.value + kpiAbbreviation
        )
      }
     
      document.getElementById('formula-input')?.focus()
    });
  }

  removeFilter() {
    this.filterDeleteEvent.emit(this.filterNumber)
  }

  get formula() { return this.filterForm.get('formula') }
}
