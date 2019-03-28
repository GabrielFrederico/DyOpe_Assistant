import { TestBed, async } from '@angular/core/testing';
import { LoginGerenteComponent } from './login-gerente.component';

describe('LoginGerenteComponent', () => {
  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [
        LoginGerenteComponent
      ],
    }).compileComponents();
  }));

  it('should create the app', () => {
    const fixture = TestBed.createComponent(LoginGerenteComponent);
    const app = fixture.debugElement.componentInstance;
    expect(app).toBeTruthy();
  });

  it(`should have as title 'DyOpe Assistant'`, () => {
    const fixture = TestBed.createComponent(LoginGerenteComponent);
    const app = fixture.debugElement.componentInstance;
    expect(app.title).toEqual('DyOpe Assistant');
  });

  it('should render title in a h1 tag', () => {
    const fixture = TestBed.createComponent(LoginGerenteComponent);
    fixture.detectChanges();
    const compiled = fixture.debugElement.nativeElement;
    expect(compiled.querySelector('h1').textContent).toContain('Welcome to angular!');
  });
});
