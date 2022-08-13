import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/app/core/services/auth.service';
import { StrategyService } from 'src/app/core/services/strategy-service.service';
import { Strategy, StrategyResult } from 'src/app/shared/models/backtester';
import { User } from 'src/app/shared/models/user';

import { Router } from '@angular/router'

import { ActivatedRoute } from '@angular/router';
import { FormControl } from '@angular/forms';
@Component({
  selector: 'app-user-strategies-page',
  templateUrl: './user-strategies-page.component.html',
  styleUrls: ['./user-strategies-page.component.scss']
})
export class UserStrategiesPageComponent implements OnInit {

  strategies: Strategy[] = [];
  user: User;
  username: string;

  toppings = new FormControl('');

  sortModes: string[] = ['Date', 'Total return', 'CAGR', 'Max Drawdown'];

  constructor(
    private strategyService: StrategyService, 
    private authService: AuthService,
    private activatedRoute: ActivatedRoute,
  ) { }

  ngOnInit(): void {
    
    let user: User = this.authService.getUserInfo()
    this.user = user
  
    let username: string = this.activatedRoute.snapshot.paramMap.get("username") || "";
    this.username = username

    this.strategyService.getUserStrategies(username).subscribe((strategies: Strategy[]) => {
      this.strategies = strategies
    })

  }

}
