import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CoordinadorEntregaDataComponent } from './coordinador-entrega-data.component';

describe('CoordinadorEntregaDataComponent', () => {
  let component: CoordinadorEntregaDataComponent;
  let fixture: ComponentFixture<CoordinadorEntregaDataComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CoordinadorEntregaDataComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CoordinadorEntregaDataComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
