import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { InformacoesSetorComponent } from './informacoes-setor.component';

describe('InformacoesSetorComponent', () => {
  let component: InformacoesSetorComponent;
  let fixture: ComponentFixture<InformacoesSetorComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ InformacoesSetorComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(InformacoesSetorComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
