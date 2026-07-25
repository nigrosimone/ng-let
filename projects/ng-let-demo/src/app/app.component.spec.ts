import { TestBed } from '@angular/core/testing';
import { AppComponent } from './app.component';

describe('AppComponent', () => {
  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AppComponent],
    }).compileComponents();
  });

  it('should create the app', () => {
    const fixture = TestBed.createComponent(AppComponent);
    expect(fixture.componentInstance).toBeTruthy();
  });

  it('renders every alias the same way it renders the source value', () => {
    const fixture = TestBed.createComponent(AppComponent);
    fixture.detectChanges();

    const rendered = (fixture.nativeElement as HTMLElement).textContent ?? '';
    // the model is `test`, so both the `as` and the `let` block must show it twice
    expect(rendered.match(/1: test/g)).toHaveLength(2);
    expect(rendered.match(/2: test/g)).toHaveLength(2);
  });
});
