import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthGuardService, LoggedInGuardSerivce } from './core/services/auth-guard.service';
import { LoginPageComponent } from './modules/auth/pages/login-page/login-page.component';
import { RegisterPageComponent } from './modules/auth/pages/register-page/register-page.component';
import { FilterComponent } from './modules/backtester/components/filter/filter.component';
import { BacktesterPageComponent } from './modules/backtester/pages/backtester-page/backtester-page.component';
import { UserStrategiesPageComponent } from './modules/strategy/pages/user-strategies-page/user-strategies-page.component';

const routes: Routes = [
  { path: 'register', component: RegisterPageComponent, canActivate: [ LoggedInGuardSerivce] },
  { path: 'login', component: LoginPageComponent, canActivate: [ LoggedInGuardSerivce ] },
  { path: 'backtester', component: BacktesterPageComponent, canActivate: [ AuthGuardService ] },
  { path: ':username/strategies', component: UserStrategiesPageComponent, canActivate: [ AuthGuardService ] }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
