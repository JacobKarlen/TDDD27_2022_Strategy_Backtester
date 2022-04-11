import { ComponentFixture, TestBed } from '@angular/core/testing';

import { KPISelectorModalComponent } from './kpiselector-modal.component';

describe('KPISelectorModalComponent', () => {
  let component: KPISelectorModalComponent;
  let fixture: ComponentFixture<KPISelectorModalComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ KPISelectorModalComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(KPISelectorModalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
