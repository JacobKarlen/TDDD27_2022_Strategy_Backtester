import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { BacktesterPageComponent } from './pages/backtester-page/backtester-page.component';
import { BacktesterFormComponent } from './components/backtester-form/backtester-form.component';

import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatCardModule } from '@angular/material/card';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatNativeDateModule } from '@angular/material/core';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import {MatSelectModule} from '@angular/material/select';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MultipleSelectComponent } from './components/multiple-select/multiple-select.component';

@NgModule({
  declarations: [
    BacktesterPageComponent,
    BacktesterFormComponent,
    MultipleSelectComponent,
  ],
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    MatCardModule,
    MatFormFieldModule,
    MatDatepickerModule,
    MatNativeDateModule,
    MatInputModule,
    MatButtonModule,
    MatSelectModule,
    MatCheckboxModule
  ],
  providers: [
    MatDatepickerModule
  ]
})
export class BacktesterModule { }
