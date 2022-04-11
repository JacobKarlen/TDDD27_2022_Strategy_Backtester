import { isNgTemplate } from '@angular/compiler';
import { Component, OnInit, Input, ViewChild, OnChanges } from '@angular/core';
import { AbstractControl, FormControl, FormGroup, ValidationErrors, ValidatorFn, Validators } from '@angular/forms';
import { MatOption } from '@angular/material/core';
import { MatSelect } from '@angular/material/select';
import { Branch, Branches, Countries, Country, Market, Markets, Sector, Sectors } from 'src/app/shared/models/borsdata';
import { FilterListComponent } from '../filter-list/filter-list.component';
import { FilterComponent } from '../filter/filter.component';

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
  @ViewChild('marketSelect') marketSelect!: MatSelect;
  @ViewChild('filterList') filterList!: FilterListComponent;
  
  countryOptions: string[] = [];
  marketsOptions: string[] = [];
  sectorsOptions: string[] = [];
  branchesOptions: string[] = [];

  marketGroups: any[] = [];
  allMarketsSelected: boolean = false; 

  filterOrder: number[] = [];
 
  backtesterForm = new FormGroup({
    'strategyName': new FormControl('', []),
    'accessSelect': new FormControl('', []),
    'startDate': new FormControl('', []),
    'endDate': new FormControl('', []),
    'marketsSelect': new FormControl('', []),
    'countrySelect': new FormControl('', []),
    'sectorSelect': new FormControl('', []),
    'branchesSelect': new FormControl('', [])
  })

  constructor() { }

  ngOnInit(): void {
    // refactor later

    this.backtesterForm.get('countrySelect')?.valueChanges.subscribe((countries: Countries) => {
      // update market options based on selected countries
      let cid = countries.map((c: Country) => c.id) 
      this.marketsOptions = this.markets.filter(
          (m: Market) => cid.includes(m.countryId)
        ).map((m: Market) => (m.name +", "+ m.exchangeName))

      let groups = this.countries.map((c: Country) => ({
        id: c.id, 
        name: c.name,
        options: [] as any,
        disabled: !cid.includes(c.id) as boolean
      }))
      console.log(groups)
      this.markets.forEach((m: Market) => {
        groups[m.countryId-1].options.push({
          value: m,
          label: m.name + ", " + m.exchangeName
        })
      })
      this.marketGroups = groups

    })

    this.backtesterForm.get('sectorSelect')?.valueChanges.subscribe((sectors: Sectors) => {

      let sid = sectors.map((s: Sector) => s.id) 
      this.branchesOptions = this.branches.filter(
          (b: Branch) => sid.includes(b.sectorId)).map((b: Branch) => (b.name))
    })

   }

  ngAfterViewInit() {
    // add filter controls to main formgroup
    this.backtesterForm.addControl('filters', this.filterList.getFiltersFormGroup())
  }

  ngOnChanges(changes: any): void {
    // delay in when inputs are available, set options when data available
    if (changes.markets) {
      this.marketsOptions = this.markets.map((m: Market) => (m.name +", "+ m.exchangeName))
    }
    if (changes.countries) {
      this.countryOptions = this.countries.map((c: Country) => c.name)
      this.updateMarketOptions([])
    }
    if (changes.sectors) {
      this.sectorsOptions = this.sectors.map((s: Sector) => s.name)
    }
    if (changes.branches) {
      this.branchesOptions = this.branches.map((b: Branch) => b.name)
    }
  }

  updateMarketOptions(cid: number[]) {
    // still not consistant
    let groups = this.countries.map((c: Country) => ({
      id: c.id, 
      name: c.name,
      options: [] as any,
      disabled: !cid.includes(c.id) as boolean
    }))
    console.log(groups)
    this.markets.forEach((m: Market) => {
      groups[m.countryId-1].options.push({
        value: m,
        label: m.name + ", " + m.exchangeName
      })
    })
    this.marketGroups = groups
  }
  
  marketToggleAllSelection() {
    // toggle all selection, activated with separate checkbox
    if (this.allMarketsSelected) {
      this.marketSelect.options.forEach((opt: MatOption) => {    
        if (!opt.disabled)  
          opt.select() 
      });
    } else {
      this.marketSelect.options.forEach((opt: MatOption) => opt.deselect());
    }
  }

  marketOptionClicked() {
    // update 'all selected'-status when an option is unselected
    let hasChanged = true;
    this.marketSelect.options.forEach((opt: MatOption) => {
      if (!opt.selected) {
        hasChanged = false;
      }
    })
    this.allMarketsSelected = hasChanged
  }

  setFilterOrder(filterOrder: number[]): void {
    // used to update filterOrder from filter-list output
    this.filterOrder = filterOrder;
  }

  startBacktest(): void { 
    console.log(this.backtesterForm.value)
    console.log("Filter order: ", this.filterOrder)
  }

}
