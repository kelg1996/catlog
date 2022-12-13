import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AgefilterComponent } from './agefilter.component';

describe('AgefilterComponent', () => {
  let component: AgefilterComponent;
  let fixture: ComponentFixture<AgefilterComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AgefilterComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AgefilterComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
