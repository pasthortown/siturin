import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CapacidadesDataComponent } from './capacidades-data.component';

describe('CapacidadesDataComponent', () => {
  let component: CapacidadesDataComponent;
  let fixture: ComponentFixture<CapacidadesDataComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CapacidadesDataComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CapacidadesDataComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
