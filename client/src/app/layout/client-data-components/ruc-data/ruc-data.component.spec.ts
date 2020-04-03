import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { RucDataComponent } from './ruc-data.component';

describe('RucDataComponent', () => {
  let component: RucDataComponent;
  let fixture: ComponentFixture<RucDataComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ RucDataComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(RucDataComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
