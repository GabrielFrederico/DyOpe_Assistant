import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { OperacaoCosturaComponent } from './operacao-costura.component';

describe('OperacaoCosturaComponent', () => {
  let component: OperacaoCosturaComponent;
  let fixture: ComponentFixture<OperacaoCosturaComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ OperacaoCosturaComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(OperacaoCosturaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
