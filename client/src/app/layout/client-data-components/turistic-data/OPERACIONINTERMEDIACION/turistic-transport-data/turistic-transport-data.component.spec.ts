import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TuristicTransportDataComponent } from './turistic-transport-data.component';

describe('TuristicTransportDataComponent', () => {
  let component: TuristicTransportDataComponent;
  let fixture: ComponentFixture<TuristicTransportDataComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TuristicTransportDataComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TuristicTransportDataComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
