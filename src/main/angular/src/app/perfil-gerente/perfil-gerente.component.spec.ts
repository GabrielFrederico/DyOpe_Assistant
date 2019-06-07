import {async, ComponentFixture, TestBed} from '@angular/core/testing';

import {PerfilGerenteComponent} from './perfil-gerente.component';

describe('PerfilGerenteComponent', () => {
  let component: PerfilGerenteComponent;
  let fixture: ComponentFixture<PerfilGerenteComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [PerfilGerenteComponent]
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PerfilGerenteComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
