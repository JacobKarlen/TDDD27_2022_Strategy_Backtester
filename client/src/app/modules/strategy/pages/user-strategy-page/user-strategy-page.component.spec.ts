import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UserStrategyPageComponent } from './user-strategy-page.component';

describe('UserStrategyPageComponent', () => {
  let component: UserStrategyPageComponent;
  let fixture: ComponentFixture<UserStrategyPageComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ UserStrategyPageComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(UserStrategyPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
