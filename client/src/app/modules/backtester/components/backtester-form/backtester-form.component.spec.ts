import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BacktesterFormComponent } from './backtester-form.component';

describe('BacktesterFormComponent', () => {
  let component: BacktesterFormComponent;
  let fixture: ComponentFixture<BacktesterFormComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ BacktesterFormComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(BacktesterFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
