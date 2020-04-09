import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PrestacionesABDataComponent } from './prestaciones-ab-data.component';

describe('PrestacionesABDataComponent', () => {
  let component: PrestacionesABDataComponent;
  let fixture: ComponentFixture<PrestacionesABDataComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PrestacionesABDataComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PrestacionesABDataComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
