import { ComponentFixture, TestBed } from '@angular/core/testing';

import { StrategiesFeedPageComponent } from './strategies-feed-page.component';

describe('StrategiesFeedPageComponent', () => {
  let component: StrategiesFeedPageComponent;
  let fixture: ComponentFixture<StrategiesFeedPageComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ StrategiesFeedPageComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(StrategiesFeedPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
