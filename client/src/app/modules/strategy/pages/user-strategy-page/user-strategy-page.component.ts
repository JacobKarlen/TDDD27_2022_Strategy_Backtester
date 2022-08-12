import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/app/core/services/auth.service';
import { StrategyService } from 'src/app/core/services/strategy-service.service';
import { Strategy } from 'src/app/shared/models/backtester';
import { ActivatedRoute } from '@angular/router';
import { User } from 'src/app/shared/models/user';

@Component({
  selector: 'app-user-strategy-page',
  templateUrl: './user-strategy-page.component.html',
  styleUrls: ['./user-strategy-page.component.scss']
})
export class UserStrategyPageComponent implements OnInit {

  strategy: Strategy;

  constructor(
    private strategyService: StrategyService, 
    private authService: AuthService,
    private activatedRoute: ActivatedRoute,
  ) { 
  }

  ngOnInit(): void {
    
    let user: User = this.authService.getUserInfo()
    //let username = user? user.username : "explore"

    //console.log(username)
    let username: string = this.activatedRoute.snapshot.paramMap.get('username') || '';
    let strategyName: string = this.activatedRoute.snapshot.paramMap.get('strategyName') || ''

    this.strategyService.getStrategy(username, strategyName).subscribe((strategy: Strategy) => {
      console.log(strategy)
      this.strategy = strategy
    })
  }

}
