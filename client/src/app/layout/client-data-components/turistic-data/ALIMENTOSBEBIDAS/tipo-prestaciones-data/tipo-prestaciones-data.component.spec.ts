import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TipoPrestacionesDataComponent } from './tipo-prestaciones-data.component';

describe('TipoPrestacionesDataComponent', () => {
  let component: TipoPrestacionesDataComponent;
  let fixture: ComponentFixture<TipoPrestacionesDataComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TipoPrestacionesDataComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TipoPrestacionesDataComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
