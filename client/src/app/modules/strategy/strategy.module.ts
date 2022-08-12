import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatCardModule } from '@angular/material/card';
import { MatButtonModule } from '@angular/material/button';

import { UserStrategiesPageComponent } from './pages/user-strategies-page/user-strategies-page.component';
import { UserStrategyPageComponent } from './pages/user-strategy-page/user-strategy-page.component';

import { RouterModule } from '@angular/router';
import { StrategiesExplorePageComponent } from './pages/strategies-explore-page/strategies-explore-page.component';
import { StrategiesFeedPageComponent } from './pages/strategies-feed-page/strategies-feed-page.component';

@NgModule({
  declarations: [
    UserStrategiesPageComponent,
    UserStrategyPageComponent,
    StrategiesExplorePageComponent,
    StrategiesFeedPageComponent
  ],
  imports: [
    CommonModule,
    MatCardModule,
    RouterModule,
    MatButtonModule
  ]
})
export class StrategyModule { }
