import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AgFilter } from './ag-filter';

describe('AgFilter', () => {
  let component: AgFilter;
  let fixture: ComponentFixture<AgFilter>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AgFilter]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AgFilter);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
