import { ComponentFixture, TestBed } from '@angular/core/testing';

import { Expanse } from './expanse';

describe('Expanse', () => {
  let component: Expanse;
  let fixture: ComponentFixture<Expanse>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [Expanse]
    })
    .compileComponents();

    fixture = TestBed.createComponent(Expanse);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
