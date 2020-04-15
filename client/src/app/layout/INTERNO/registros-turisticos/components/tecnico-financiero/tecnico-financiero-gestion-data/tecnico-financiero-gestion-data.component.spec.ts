import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TecnicoFinancieroGestionDataComponent } from './tecnico-financiero-gestion-data.component';

describe('TecnicoFinancieroGestionDataComponent', () => {
  let component: TecnicoFinancieroGestionDataComponent;
  let fixture: ComponentFixture<TecnicoFinancieroGestionDataComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TecnicoFinancieroGestionDataComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TecnicoFinancieroGestionDataComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
