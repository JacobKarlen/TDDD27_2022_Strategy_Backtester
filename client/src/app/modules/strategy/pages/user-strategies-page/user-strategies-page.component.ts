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

  constructor(
    private strategyService: StrategyService, 
    private authService: AuthService,
    private activatedRoute: ActivatedRoute,
  ) { }

  ngOnInit(): void {
    
    this.user = this.authService.getUserInfo()
  
    this.username = this.activatedRoute.snapshot.paramMap.get("username") || "";

    this.strategyService.getUserStrategies(this.username).subscribe((strategies: Strategy[]) => {
      this.strategies = strategies
    })

  }

}
