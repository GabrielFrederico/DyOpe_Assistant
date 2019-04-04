import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { FuncionarioIndexComponent } from './funcionario-index.component';

describe('FuncionarioIndexComponent', () => {
  let component: FuncionarioIndexComponent;
  let fixture: ComponentFixture<FuncionarioIndexComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ FuncionarioIndexComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(FuncionarioIndexComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
