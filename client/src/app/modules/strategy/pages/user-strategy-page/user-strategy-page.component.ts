import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/app/core/services/auth.service';
import { StrategyService } from 'src/app/core/services/strategy-service.service';
import { Strategy } from 'src/app/shared/models/backtester';
import { ActivatedRoute } from '@angular/router';
import { User } from 'src/app/shared/models/user';
import { UserService } from 'src/app/core/services/user.service';

@Component({
  selector: 'app-user-strategy-page',
  templateUrl: './user-strategy-page.component.html',
  styleUrls: ['./user-strategy-page.component.scss']
})
export class UserStrategyPageComponent implements OnInit {

  strategy: Strategy;
  equityData: Array<object> = []
  username: string = ''
  user: User;
  isFollowing: Boolean;

  constructor(
    private strategyService: StrategyService, 
    private authService: AuthService,
    private activatedRoute: ActivatedRoute,
    private userService: UserService
  ) { 
  }

  ngOnInit(): void {
    
    this.user = this.authService.getUserInfo()
    //let username = user? user.username : "explore"

    let username: string = this.activatedRoute.snapshot.paramMap.get('username') || '';
    let strategyName: string = this.activatedRoute.snapshot.paramMap.get('strategyName') || ''
    this.username = username

    console.log(this.user)
    this.userService.getFollowing().subscribe(users => {
      this.isFollowing = users.some(user => user.username === username)
    })

    this.strategyService.getStrategy(username, strategyName).subscribe((strategy: Strategy) => {
      console.log(strategy)
      this.strategy = strategy

      if (strategy.result) {
        this.equityData = [{
          name: 'Portfolio',
          series: strategy.result.portfolioSnapshots.map((pss, i) => ({
              name: i,
              value:  pss.equity
            })
          )
        }]
        strategy.result.maxDrawdown *= 100
        strategy.result.totalReturn = (strategy.result.totalReturn-1) * 100
        strategy.result.cagr *= 100
      }
     
    })
  }

  followOrUnfollow() {
    if (this.isFollowing) {
      this.userService.unfollowUser(this.username).subscribe(res => {
        this.authService.getUpdatedUser().subscribe(user => {
          this.authService.setUserInfo(user)
        })
      })
    } else {
      this.userService.followUser(this.username).subscribe(res => {
        this.authService.getUpdatedUser().subscribe(user => {
          this.authService.setUserInfo(user)
        })
      })
    }
    this.isFollowing =  !this.isFollowing
  }
}
