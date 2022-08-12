import { ComponentFixture, TestBed } from '@angular/core/testing';

import { StrategiesExplorePageComponent } from './strategies-explore-page.component';

describe('StrategiesExplorePageComponent', () => {
  let component: StrategiesExplorePageComponent;
  let fixture: ComponentFixture<StrategiesExplorePageComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ StrategiesExplorePageComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(StrategiesExplorePageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
