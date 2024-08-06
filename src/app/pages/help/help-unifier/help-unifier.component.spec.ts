import { ComponentFixture, TestBed } from '@angular/core/testing';

import { HelpUnifierComponent } from './help-unifier.component';

describe('HelpUnifierComponent', () => {
  let component: HelpUnifierComponent;
  let fixture: ComponentFixture<HelpUnifierComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [HelpUnifierComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(HelpUnifierComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
