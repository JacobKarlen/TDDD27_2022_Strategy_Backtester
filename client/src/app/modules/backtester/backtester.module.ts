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
import { FilterComponent } from './components/filter/filter.component';
import { MatChipsModule } from '@angular/material/chips'

import { DragDropModule } from "@angular/cdk/drag-drop";
import { KPISelectorModalComponent } from './components/kpiselector-modal/kpiselector-modal.component'
import { MatDialogModule } from '@angular/material/dialog';
import { FilterListComponent } from './components/filter-list/filter-list.component';
import { MatIconModule } from '@angular/material/icon';

@NgModule({
  declarations: [
    BacktesterPageComponent,
    BacktesterFormComponent,
    MultipleSelectComponent,
    FilterComponent,
    KPISelectorModalComponent,
    FilterListComponent,
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
    MatCheckboxModule,
    MatChipsModule,
    DragDropModule,
    MatDialogModule,
    MatIconModule
  ],
  providers: [
    MatDatepickerModule
  ]
})
export class BacktesterModule { }
