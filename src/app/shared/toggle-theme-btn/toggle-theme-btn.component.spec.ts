import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ToggleThemeBtnComponent } from './toggle-theme-btn.component';

describe('ToggleThemeBtnComponent', () => {
  let component: ToggleThemeBtnComponent;
  let fixture: ComponentFixture<ToggleThemeBtnComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ToggleThemeBtnComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ToggleThemeBtnComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
