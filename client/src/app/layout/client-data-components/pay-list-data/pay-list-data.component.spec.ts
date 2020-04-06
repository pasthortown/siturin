import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PayListDataComponent } from './pay-list-data.component';

describe('PayListDataComponent', () => {
  let component: PayListDataComponent;
  let fixture: ComponentFixture<PayListDataComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PayListDataComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PayListDataComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
