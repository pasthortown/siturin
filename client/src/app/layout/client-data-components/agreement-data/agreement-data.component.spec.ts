import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AgreementDataComponent } from './agreement-data.component';

describe('AgreementDataComponent', () => {
  let component: AgreementDataComponent;
  let fixture: ComponentFixture<AgreementDataComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AgreementDataComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AgreementDataComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
