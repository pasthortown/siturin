import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DeclarationDataComponent } from './declaration-data.component';

describe('DeclarationDataComponent', () => {
  let component: DeclarationDataComponent;
  let fixture: ComponentFixture<DeclarationDataComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DeclarationDataComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DeclarationDataComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
