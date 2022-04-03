import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthGuardService, LoggedInGuardSerivce } from './core/services/auth-guard.service';
import { LoginPageComponent } from './modules/auth/pages/login-page/login-page.component';
import { RegisterPageComponent } from './modules/auth/pages/register-page/register-page.component';
import { BacktesterPageComponent } from './modules/backtester/pages/backtester-page/backtester-page.component';

const routes: Routes = [
  { path: 'register', component: RegisterPageComponent, canActivate: [ LoggedInGuardSerivce] },
  { path: 'login', component: LoginPageComponent, canActivate: [ LoggedInGuardSerivce ] },
  { path: 'backtester', component: BacktesterPageComponent, canActivate: [ AuthGuardService ] }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
