import { Component, OnInit } from '@angular/core';
import { BorsdataService } from 'src/app/core/services/borsdata.service';

@Component({
  selector: 'app-backtester-page',
  templateUrl: './backtester-page.component.html',
  styleUrls: ['./backtester-page.component.scss']
})
export class BacktesterPageComponent implements OnInit {

  markets: any;

  constructor(private borsdataService: BorsdataService) { }

  ngOnInit(): void {
    this.borsdataService.getMarkets().subscribe((m) => {
      this.markets = m.markets
      console.log(this.markets)
    })
  }

}
