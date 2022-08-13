import { Component, OnInit } from '@angular/core';
import { StrategyService } from 'src/app/core/services/strategy-service.service';
import { Strategy } from 'src/app/shared/models/backtester';

@Component({
  selector: 'app-strategies-explore-page',
  templateUrl: './strategies-explore-page.component.html',
  styleUrls: ['./strategies-explore-page.component.scss']
})
export class StrategiesExplorePageComponent implements OnInit {

  strategies: Strategy[];

  constructor(private strategyService: StrategyService) { }

  ngOnInit(): void {

    this.strategyService.getStrategiesExplore().subscribe((strategies: Strategy[]) => {
      this.strategies = strategies
    })

  }

}
