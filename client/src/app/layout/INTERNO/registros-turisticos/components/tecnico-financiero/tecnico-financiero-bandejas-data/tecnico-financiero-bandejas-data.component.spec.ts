import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TecnicoFinancieroBandejasDataComponent } from './tecnico-financiero-bandejas-data.component';

describe('TecnicoFinancieroBandejasDataComponent', () => {
  let component: TecnicoFinancieroBandejasDataComponent;
  let fixture: ComponentFixture<TecnicoFinancieroBandejasDataComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TecnicoFinancieroBandejasDataComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TecnicoFinancieroBandejasDataComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
