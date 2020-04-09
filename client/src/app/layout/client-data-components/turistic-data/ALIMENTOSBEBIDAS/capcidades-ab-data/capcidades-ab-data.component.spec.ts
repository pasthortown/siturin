import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CapcidadesABDataComponent } from './capcidades-ab-data.component';

describe('CapcidadesABDataComponent', () => {
  let component: CapcidadesABDataComponent;
  let fixture: ComponentFixture<CapcidadesABDataComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CapcidadesABDataComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CapcidadesABDataComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
