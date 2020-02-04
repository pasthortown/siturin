import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { BitacoraPageComponent } from './bitacora.component';

describe('BitacoraPageComponent', () => {
  let component: BitacoraPageComponent;
  let fixture: ComponentFixture<BitacoraPageComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [BitacoraPageComponent]
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(BitacoraPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
