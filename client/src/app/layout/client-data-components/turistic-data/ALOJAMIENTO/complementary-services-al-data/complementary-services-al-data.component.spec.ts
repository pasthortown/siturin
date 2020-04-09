import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ComplementaryServicesALDataComponent } from './complementary-services-al-data.component';

describe('ComplementaryServicesALDataComponent', () => {
  let component: ComplementaryServicesALDataComponent;
  let fixture: ComponentFixture<ComplementaryServicesALDataComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ComplementaryServicesALDataComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ComplementaryServicesALDataComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
