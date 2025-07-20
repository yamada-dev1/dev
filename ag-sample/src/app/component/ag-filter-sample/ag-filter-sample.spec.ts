import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AgFilterSample } from './ag-filter-sample';

describe('AgFilterSample', () => {
  let component: AgFilterSample;
  let fixture: ComponentFixture<AgFilterSample>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AgFilterSample]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AgFilterSample);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
