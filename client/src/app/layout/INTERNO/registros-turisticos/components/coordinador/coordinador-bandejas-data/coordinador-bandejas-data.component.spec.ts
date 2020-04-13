import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CoordinadorBandejasDataComponent } from './coordinador-bandejas-data.component';

describe('CoordinadorBandejasDataComponent', () => {
  let component: CoordinadorBandejasDataComponent;
  let fixture: ComponentFixture<CoordinadorBandejasDataComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CoordinadorBandejasDataComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CoordinadorBandejasDataComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
