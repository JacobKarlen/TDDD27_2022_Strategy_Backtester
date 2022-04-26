import { Component, OnInit } from '@angular/core';
import { StrategyService } from 'src/app/core/services/strategy-service.service';
import { Strategy } from 'src/app/shared/models/backtester';

@Component({
  selector: 'app-user-strategies-page',
  templateUrl: './user-strategies-page.component.html',
  styleUrls: ['./user-strategies-page.component.scss']
})
export class UserStrategiesPageComponent implements OnInit {

  strategies: Strategy[] = [];

  constructor(private strategyService: StrategyService) { }

  ngOnInit(): void {
    this.strategyService.getAllStrategies().subscribe((strategies: Strategy[]) => {
      this.strategies = strategies
    })
      
  }

}
