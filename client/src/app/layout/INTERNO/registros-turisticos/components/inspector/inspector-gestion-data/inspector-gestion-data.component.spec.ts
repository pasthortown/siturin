import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { InspectorGestionDataComponent } from './inspector-gestion-data.component';

describe('InspectorGestionDataComponent', () => {
  let component: InspectorGestionDataComponent;
  let fixture: ComponentFixture<InspectorGestionDataComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ InspectorGestionDataComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(InspectorGestionDataComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
