import { isNgTemplate } from '@angular/compiler';
import { Component, OnInit, Input, ViewChild, OnChanges } from '@angular/core';
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
  @Input() countries = [];
  
  marketsOptions: string[] = [];
  countryOptions: string[] = [];
 
  backtesterForm = new FormGroup({
    'marketSelect': new FormControl('', [ 
    
    ]),
    'countrySelect': new FormControl('', [])
  })

  constructor() { }

  ngOnInit(): void { }

  ngOnChanges(changes: any): void {
    // might refactor later or move borsdata service call
    if (changes.markets) {
      this.marketsOptions = this.markets.map((m:any) => (m.name +", "+ m.exchangeName))          
    }
    if (changes.countries) {
      this.countryOptions = this.countries.map((c:any) => c.name)
    }

  }

  onSubmit() { }

}
