import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatCardModule } from '@angular/material/card';
import { UserStrategiesPageComponent } from './pages/user-strategies-page/user-strategies-page.component';
import { UserStrategyPageComponent } from './pages/user-strategy-page/user-strategy-page.component';



@NgModule({
  declarations: [
    UserStrategiesPageComponent,
    UserStrategyPageComponent
  ],
  imports: [
    CommonModule,
    MatCardModule
  ]
})
export class StrategyModule { }
