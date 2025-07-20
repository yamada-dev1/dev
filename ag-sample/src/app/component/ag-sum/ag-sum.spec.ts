import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AgSum } from './ag-sum';

describe('AgSum', () => {
  let component: AgSum;
  let fixture: ComponentFixture<AgSum>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AgSum]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AgSum);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
