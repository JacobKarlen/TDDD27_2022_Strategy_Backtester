import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { StrategyService } from 'src/app/core/services/strategy-service.service';
import { Strategy } from 'src/app/shared/models/backtester';

@Component({
  selector: 'app-strategies-feed-page',
  templateUrl: './strategies-feed-page.component.html',
  styleUrls: ['./strategies-feed-page.component.scss']
})
export class StrategiesFeedPageComponent implements OnInit {

  strategies: Strategy[] = [];

  constructor(
    private strategyService: StrategyService,
  ) { }

  ngOnInit(): void {

    this.strategyService.getStrategiesFeed().subscribe((strategies: Strategy[]) => {
      this.strategies = strategies
    })

  }

}
