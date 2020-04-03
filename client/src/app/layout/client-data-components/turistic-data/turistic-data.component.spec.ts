import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TuristicDataComponent } from './turistic-data.component';

describe('TuristicDataComponent', () => {
  let component: TuristicDataComponent;
  let fixture: ComponentFixture<TuristicDataComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TuristicDataComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TuristicDataComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
