import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthGuardService, LoggedInGuardService } from './core/services/auth-guard.service';
import { LoginPageComponent } from './modules/auth/pages/login-page/login-page.component';
import { RegisterPageComponent } from './modules/auth/pages/register-page/register-page.component';
import { BacktesterPageComponent } from './modules/backtester/pages/backtester-page/backtester-page.component';
import { StrategiesExplorePageComponent } from './modules/strategy/pages/strategies-explore-page/strategies-explore-page.component';
import { StrategiesFeedPageComponent } from './modules/strategy/pages/strategies-feed-page/strategies-feed-page.component';
import { UserStrategiesPageComponent } from './modules/strategy/pages/user-strategies-page/user-strategies-page.component';
import { UserStrategyPageComponent } from './modules/strategy/pages/user-strategy-page/user-strategy-page.component';

const routes: Routes = [
  { path: 'register', component: RegisterPageComponent, canActivate: [ LoggedInGuardService] },
  { path: 'login', component: LoginPageComponent, canActivate: [ LoggedInGuardService ] },
  { path: 'backtester', component: BacktesterPageComponent, canActivate: [ AuthGuardService ] },
  { path: 'strategies/feed', component: StrategiesFeedPageComponent, canActivate: [ AuthGuardService ] },
  { path: 'strategies/explore', component: StrategiesExplorePageComponent, canActivate: [ AuthGuardService ] },
  { path: ':username/strategies', component: UserStrategiesPageComponent, canActivate: [ AuthGuardService ] },
  { path: ':username/strategies/:strategyName', component: UserStrategyPageComponent, canActivate: [ AuthGuardService ] },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
