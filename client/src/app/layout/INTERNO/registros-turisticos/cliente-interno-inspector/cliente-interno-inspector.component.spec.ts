import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ClienteInternoInspectorComponent } from './cliente-interno-inspector.component';

describe('ClienteInternoInspectorComponent', () => {
  let component: ClienteInternoInspectorComponent;
  let fixture: ComponentFixture<ClienteInternoInspectorComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ClienteInternoInspectorComponent]
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ClienteInternoInspectorComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
