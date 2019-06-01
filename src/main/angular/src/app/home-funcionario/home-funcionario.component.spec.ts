import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { HomeFuncionarioComponent } from './home-funcionario.component';

describe('HomeFuncionarioComponent', () => {
  let component: HomeFuncionarioComponent;
  let fixture: ComponentFixture<HomeFuncionarioComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ HomeFuncionarioComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(HomeFuncionarioComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
