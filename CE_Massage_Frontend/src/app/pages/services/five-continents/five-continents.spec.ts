import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FiveContinents } from './five-continents';

describe('FiveContinents', () => {
  let component: FiveContinents;
  let fixture: ComponentFixture<FiveContinents>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [FiveContinents]
    })
    .compileComponents();

    fixture = TestBed.createComponent(FiveContinents);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
