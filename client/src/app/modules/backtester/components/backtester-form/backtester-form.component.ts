import { isNgTemplate } from '@angular/compiler';
import { Component, OnInit, Input, ViewChild, OnChanges } from '@angular/core';
import { AbstractControl, FormControl, FormGroup, ValidationErrors, ValidatorFn, Validators } from '@angular/forms';
import { MatSelect } from '@angular/material/select';
import { Branch, Branches, Countries, Country, Market, Markets, Sector, Sectors } from 'src/app/shared/models/borsdata';

@Component({
  selector: 'app-backtester-form',
  templateUrl: './backtester-form.component.html',
  styleUrls: ['./backtester-form.component.scss']
})
export class BacktesterFormComponent implements OnInit {
  @Input() markets: Markets = [];
  @Input() countries: Countries = [];
  @Input() sectors: Sectors = [];
  @Input() branches: Branches = [];
  
  countryOptions: string[] = [];
  marketsOptions: string[] = [];
  sectorsOptions: string[] = [];
  branchesOptions: string[] = [];
 
  backtesterForm = new FormGroup({
    'marketSelect': new FormControl('', [ 
    
    ]),
    'countrySelect': new FormControl('', []),
    'sectorSelect': new FormControl('', []),
    'branchesSelect': new FormControl('', [])
  })

  constructor() { }

  ngOnInit(): void {
    this.backtesterForm.get('countrySelect')?.valueChanges.subscribe((countries: Countries) => {
      // update market options based on selected countries
      let cid = countries.map((c: Country) => c.id) 
      this.marketsOptions = this.markets.filter(
          (m: Market) => cid.includes(m.countryId)
        ).map((m: Market) => (m.name +", "+ m.exchangeName))
    })

    this.backtesterForm.get('sectorSelect')?.valueChanges.subscribe((sectors: Sectors) => {

      let sid = sectors.map((s: Sector) => s.id) 
      this.branchesOptions = this.branches.filter(
          (b: Branch) => sid.includes(b.sectorId)).map((b: Branch) => (b.name))
    })

   }

  ngOnChanges(changes: any): void {
    // delay in when inputs are available, set options when data available
    if (changes.markets) {
      this.marketsOptions = this.markets.map((m: Market) => (m.name +", "+ m.exchangeName))          
    }
    if (changes.countries) {
      this.countryOptions = this.countries.map((c: Country) => c.name)
    }
    if (changes.sectors) {
      this.sectorsOptions = this.sectors.map((s: Sector) => s.name)
    }
    if (changes.branches) {
      this.branchesOptions = this.branches.map((b: Branch) => b.name)
    }
  }

  onSubmit() { }

}
