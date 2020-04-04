import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { RegistersDataComponent } from './registers-data.component';

describe('RegistersDataComponent', () => {
  let component: RegistersDataComponent;
  let fixture: ComponentFixture<RegistersDataComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ RegistersDataComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(RegistersDataComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
