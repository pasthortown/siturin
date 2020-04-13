import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ClienteInternoCoordinadorComponent } from './cliente-interno-coordinador.component';

describe('ClienteInternoCoordinadorComponent', () => {
  let component: ClienteInternoCoordinadorComponent;
  let fixture: ComponentFixture<ClienteInternoCoordinadorComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ClienteInternoCoordinadorComponent]
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ClienteInternoCoordinadorComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
