import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CoordinadorAsignacionDataComponent } from './coordinador-asignacion-data.component';

describe('CoordinadorAsignacionDataComponent', () => {
  let component: CoordinadorAsignacionDataComponent;
  let fixture: ComponentFixture<CoordinadorAsignacionDataComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CoordinadorAsignacionDataComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CoordinadorAsignacionDataComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
