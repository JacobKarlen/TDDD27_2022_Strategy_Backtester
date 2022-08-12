import { isNgTemplate } from '@angular/compiler';
import { Component, OnInit, Input, ViewChild, OnChanges } from '@angular/core';
import { AbstractControl, FormControl, FormGroup, ValidationErrors, ValidatorFn, Validators } from '@angular/forms';
import { MatOption } from '@angular/material/core';
import { MatSelect } from '@angular/material/select';
import { BacktesterService } from 'src/app/core/services/backtester.service';
import { Branch, Branches, Countries, Country, Market, Markets, Sector, Sectors } from 'src/app/shared/models/borsdata';
import { FilterListComponent } from '../filter-list/filter-list.component';
import { FilterComponent } from '../filter/filter.component';

import { StrategyMetadata } from 'src/app/shared/models/backtester';
import { THIS_EXPR } from '@angular/compiler/src/output/output_ast';

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
  @ViewChild('branchesSelect') branchesSelect!: MatSelect;
  @ViewChild('filterList') filterList!: FilterListComponent;
  
  countryOptions: string[] = [];
  marketsOptions: string[] = [];
  sectorsOptions: string[] = [];
  branchesOptions: string[] = [];

  marketGroups: any[] = [];
  allMarketsSelected: boolean = false; 

  branchGroups: any[] = [];
  allBranchesSelected: boolean = false; 

  filterOrder: number[] = [];
 
  backtesterForm = new FormGroup({
    'strategyName': new FormControl('', []),
    'accessStatus': new FormControl('', []),
    'startDate': new FormControl('', []),
    'endDate': new FormControl('', []),
    'transactionCost': new FormControl('', []),
    'rebalanceFrequency': new FormControl('', []),
    'markets': new FormControl([], []),
    'countries': new FormControl([], []),
    'sectors': new FormControl([], []),
    'branches': new FormControl([], [])
  })

  constructor(private backtesterService: BacktesterService) { }

  ngOnInit(): void {
    // refactor later

    this.backtesterForm.get('countries')?.valueChanges.subscribe((countries: Countries) => {
      // update market options based on selected countries
      let cid = countries.map((c: Country) => c.id) 
      this.updateMarketOptions(cid)

    })

    this.backtesterForm.get('sectors')?.valueChanges.subscribe((sectors: Sectors) => {

      let sid = sectors.map((s: Sector) => s.id) 
      this.updateBranchesOptions(sid)
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
      this.updateMarketOptions([])
    }
    if (changes.countries) {
      this.countryOptions = this.countries.map((c: Country) => c.name)
     
    }
    if (changes.sectors) {
      this.sectorsOptions = this.sectors.map((s: Sector) => s.name)
      
    }
    if (changes.branches) {
      this.branchesOptions = this.branches.map((b: Branch) => b.name)
      this.updateBranchesOptions([])
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

  updateBranchesOptions(sid: number[]) {
    // still not consistant
    let groups = this.sectors.map((s: Sector) => ({
      id: s.id, 
      name: s.name,
      options: [] as any,
      disabled: !sid.includes(s.id) as boolean
    }))
    console.log(groups)
    this.branches.forEach((b: Branch) => {
      groups[b.sectorId-1].options.push({
        value: b,
        label: b.name
      })
    })
    this.branchGroups = groups
  }
  
  branchesToggleAllSelection() {
    // toggle all selection, activated with separate checkbox
    if (this.allBranchesSelected) {
      this.branchesSelect.options.forEach((opt: MatOption) => {    
        if (!opt.disabled)  
          opt.select() 
      });
    } else {
      this.branchesSelect.options.forEach((opt: MatOption) => opt.deselect());
    }
  }

  branchOptionClicked() {
    // update 'all selected'-status when an option is unselected
    let hasChanged = true;
    this.branchesSelect.options.forEach((opt: MatOption) => {
      if (!opt.selected) {
        hasChanged = false;
      }
    })
    this.allBranchesSelected = hasChanged
  }



  setFilterOrder(filterOrder: number[]): void {
    // used to update filterOrder from filter-list output
    this.filterOrder = filterOrder;
  }

  startBacktest(): void { 
    let formValues = JSON.parse(JSON.stringify(this.backtesterForm.value)); // deep copy
    formValues.filters = this.filterOrder.map((fn: number) => {
      // correct for changed filter orders
      return formValues.filters['filter'+fn]
    })
    let strategyMetadata: StrategyMetadata = formValues;

    console.log(strategyMetadata)
  
    this.backtesterService.runBacktest(strategyMetadata).subscribe((res: any) => {
      console.log(res)
    })
  }

  printFormValues(): void {
    let formValues = JSON.parse(JSON.stringify(this.backtesterForm.value)); // deep copy
    formValues.filters = this.filterOrder.map((fn: number) => {
      // correct for changed filter orders
      return formValues.filters['filter'+fn]
    })
    formValues.startDate = new Date(formValues.startDate)
    formValues.endDate = new Date(formValues.endDate) 

    let strategyMetadata: StrategyMetadata = formValues;

    console.log(strategyMetadata)
  }
}
