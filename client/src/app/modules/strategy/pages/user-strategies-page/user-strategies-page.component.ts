import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/app/core/services/auth.service';
import { StrategyService } from 'src/app/core/services/strategy-service.service';
import { Strategy } from 'src/app/shared/models/backtester';
import { User } from 'src/app/shared/models/user';

import { Router } from '@angular/router'

import { ActivatedRoute } from '@angular/router';
@Component({
  selector: 'app-user-strategies-page',
  templateUrl: './user-strategies-page.component.html',
  styleUrls: ['./user-strategies-page.component.scss']
})
export class UserStrategiesPageComponent implements OnInit {

  strategies: Strategy[] = [];

  constructor(
    private strategyService: StrategyService, 
    private authService: AuthService,
    private activatedRoute: ActivatedRoute,
    private router: Router
  ) { }

  ngOnInit(): void {
    // this.strategyService.getAllStrategies().subscribe((strategies: Strategy[]) => {
    //   this.strategies = strategies
    // })
    
    let user: User = this.authService.getUserInfo()
    //let username = user? user.username : "explore"

    //console.log(username)
    let username: string = this.activatedRoute.snapshot.paramMap.get("username") || "";


    this.strategyService.getUserStrategies(username).subscribe((strategies: Strategy[]) => {
      console.log(strategies)
      this.strategies = strategies
    })
  }

}
