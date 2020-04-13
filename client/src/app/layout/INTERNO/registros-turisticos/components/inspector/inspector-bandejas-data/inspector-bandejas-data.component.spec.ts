import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { InspectorBandejasDataComponent } from './inspector-bandejas-data.component';

describe('InspectorBandejasDataComponent', () => {
  let component: InspectorBandejasDataComponent;
  let fixture: ComponentFixture<InspectorBandejasDataComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ InspectorBandejasDataComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(InspectorBandejasDataComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
