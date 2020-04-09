import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CapacidadesALDataComponent } from './capacidades-al-data.component';

describe('CapacidadesALDataComponent', () => {
  let component: CapacidadesALDataComponent;
  let fixture: ComponentFixture<CapacidadesALDataComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CapacidadesALDataComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CapacidadesALDataComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
