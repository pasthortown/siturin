import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { EstablishmentDataComponent } from './establishment-data.component';

describe('EstablishmentDataComponent', () => {
  let component: EstablishmentDataComponent;
  let fixture: ComponentFixture<EstablishmentDataComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ EstablishmentDataComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(EstablishmentDataComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
