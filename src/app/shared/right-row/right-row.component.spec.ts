import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RightRowComponent } from './right-row.component';

describe('RightRowComponent', () => {
  let component: RightRowComponent;
  let fixture: ComponentFixture<RightRowComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [RightRowComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(RightRowComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
