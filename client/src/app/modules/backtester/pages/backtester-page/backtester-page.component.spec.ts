import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BacktesterPageComponent } from './backtester-page.component';

describe('BacktesterPageComponent', () => {
  let component: BacktesterPageComponent;
  let fixture: ComponentFixture<BacktesterPageComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ BacktesterPageComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(BacktesterPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
