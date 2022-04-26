import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UserStrategiesPageComponent } from './user-strategies-page.component';

describe('UserStrategiesPageComponent', () => {
  let component: UserStrategiesPageComponent;
  let fixture: ComponentFixture<UserStrategiesPageComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ UserStrategiesPageComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(UserStrategiesPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
