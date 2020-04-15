import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CoordinadorGestionDataComponent } from './coordinador-gestion-data.component';

describe('CoordinadorGestionDataComponent', () => {
  let component: CoordinadorGestionDataComponent;
  let fixture: ComponentFixture<CoordinadorGestionDataComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CoordinadorGestionDataComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CoordinadorGestionDataComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
