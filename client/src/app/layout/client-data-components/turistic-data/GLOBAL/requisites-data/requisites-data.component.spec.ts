import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { RequisitesDataComponent } from './requisites-data.component';

describe('RequisitesDataComponent', () => {
  let component: RequisitesDataComponent;
  let fixture: ComponentFixture<RequisitesDataComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ RequisitesDataComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(RequisitesDataComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
