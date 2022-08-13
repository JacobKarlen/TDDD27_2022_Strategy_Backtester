import { Component, OnInit, Input } from '@angular/core';
import { Strategy, StrategyResult } from 'src/app/shared/models/backtester';

@Component({
  selector: 'strategy-card',
  templateUrl: './strategy-card.component.html',
  styleUrls: ['./strategy-card.component.scss']
})
export class StrategyCardComponent implements OnInit {
  @Input() strategy: Strategy;

  constructor() { }

  ngOnInit(): void {
  }

  ngOnChanges(changes: any): void {
    // delay in when inputs are available, set options when data available
    if (changes.strategy) {
      let strategy = this.strategy;
    
      if (strategy.result !== null && strategy.result !== undefined) {
        const result: StrategyResult = strategy.result;
        result.totalReturn = (result.totalReturn -1) * 100;
        result.cagr = (result.cagr) * 100;
        result.maxDrawdown = (result.maxDrawdown) * 100;
      }

      this.strategy = strategy
    }
  }
}
