import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ClienteInternoTecnicoFinancieroComponent } from './cliente-interno-tecnico-financiero.component';

describe('ClienteInternoTecnicoFinancieroComponent', () => {
  let component: ClienteInternoTecnicoFinancieroComponent;
  let fixture: ComponentFixture<ClienteInternoTecnicoFinancieroComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ClienteInternoTecnicoFinancieroComponent]
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ClienteInternoTecnicoFinancieroComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
