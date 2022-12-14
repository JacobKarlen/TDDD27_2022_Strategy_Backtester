import { Component, OnInit } from '@angular/core';
import { BorsdataService } from 'src/app/core/services/borsdata.service';
import { Branches, Countries, Country, Market, Markets, Sectors } from 'src/app/shared/models/borsdata';

@Component({
  selector: 'app-backtester-page',
  templateUrl: './backtester-page.component.html',
  styleUrls: ['./backtester-page.component.scss']
})
export class BacktesterPageComponent implements OnInit {

  markets: Markets = [];
  countries: Countries = [];
  sectors: Sectors = [];
  branches: Branches = [];


  constructor(private borsdataService: BorsdataService) { }

  ngOnInit(): void {
    this.borsdataService.getCountries().subscribe((countries: Countries) => {
      this.countries = countries
    })
    this.borsdataService.getMarkets().subscribe((markets: Markets) => {
      // filter out unapplicable markets, keep nordic markets
      this.markets = markets.filter((m: Market) => { return m.countryId <= 4 })
    })
    this.borsdataService.getSectors().subscribe((sectors: Sectors) => {
      this.sectors = sectors
    })
    this.borsdataService.getBranches().subscribe((branches: Branches) => {
      this.branches = branches
    })
  }

}
