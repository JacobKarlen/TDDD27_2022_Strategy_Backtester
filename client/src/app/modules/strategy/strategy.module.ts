import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatCardModule } from '@angular/material/card';
import { MatButtonModule } from '@angular/material/button';


import { UserStrategiesPageComponent } from './pages/user-strategies-page/user-strategies-page.component';
import { UserStrategyPageComponent } from './pages/user-strategy-page/user-strategy-page.component';

import { RouterModule } from '@angular/router';
import { StrategiesExplorePageComponent } from './pages/strategies-explore-page/strategies-explore-page.component';
import { StrategiesFeedPageComponent } from './pages/strategies-feed-page/strategies-feed-page.component';
import {MatExpansionModule} from '@angular/material/expansion';
import { NgxChartsModule }from '@swimlane/ngx-charts';
import { MatIconModule } from '@angular/material/icon';
import { MatSelectModule } from '@angular/material/select';
import { StrategyCardComponent } from './components/strategy-card/strategy-card.component';

@NgModule({
  declarations: [
    UserStrategiesPageComponent,
    UserStrategyPageComponent,
    StrategiesExplorePageComponent,
    StrategiesFeedPageComponent,
    StrategyCardComponent,
  ],
  imports: [
    CommonModule,
    MatCardModule,
    RouterModule,
    MatButtonModule,
    NgxChartsModule,
    MatExpansionModule,
    MatIconModule,
    MatSelectModule,
  ]
})
export class StrategyModule { }
