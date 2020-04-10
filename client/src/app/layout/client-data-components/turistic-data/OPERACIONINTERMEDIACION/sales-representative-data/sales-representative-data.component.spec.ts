import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SalesRepresentativeDataComponent } from './sales-representative-data.component';

describe('SalesRepresentativeDataComponent', () => {
  let component: SalesRepresentativeDataComponent;
  let fixture: ComponentFixture<SalesRepresentativeDataComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SalesRepresentativeDataComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SalesRepresentativeDataComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
