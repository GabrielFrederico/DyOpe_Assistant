import {async, ComponentFixture, TestBed} from '@angular/core/testing';

import {PlanilhaCustoComponent} from './planilha-custo.component';

describe('PlanilhaCustoComponent', () => {
  let component: PlanilhaCustoComponent;
  let fixture: ComponentFixture<PlanilhaCustoComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [PlanilhaCustoComponent]
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PlanilhaCustoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
