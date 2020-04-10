import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TourGuideDataComponent } from './tour-guide-data.component';

describe('TourGuideDataComponent', () => {
  let component: TourGuideDataComponent;
  let fixture: ComponentFixture<TourGuideDataComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TourGuideDataComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TourGuideDataComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
