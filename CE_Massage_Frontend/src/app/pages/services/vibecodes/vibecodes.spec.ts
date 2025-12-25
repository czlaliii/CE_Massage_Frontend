import { ComponentFixture, TestBed } from '@angular/core/testing';

import { Vibecodes } from './vibecodes';

describe('Vibecodes', () => {
  let component: Vibecodes;
  let fixture: ComponentFixture<Vibecodes>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [Vibecodes]
    })
    .compileComponents();

    fixture = TestBed.createComponent(Vibecodes);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
