import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { EstablishmentListDataComponent } from './establishment-list-data.component';

describe('EstablishmentListDataComponent', () => {
  let component: EstablishmentListDataComponent;
  let fixture: ComponentFixture<EstablishmentListDataComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ EstablishmentListDataComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(EstablishmentListDataComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
