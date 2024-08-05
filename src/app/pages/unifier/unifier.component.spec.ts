import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UnifierComponent } from './unifier.component';

describe('UnifierComponent', () => {
  let component: UnifierComponent;
  let fixture: ComponentFixture<UnifierComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [UnifierComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(UnifierComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
