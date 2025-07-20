import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AgCellRenderer } from './ag-cell-renderer';

describe('AgCellRenderer', () => {
  let component: AgCellRenderer;
  let fixture: ComponentFixture<AgCellRenderer>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AgCellRenderer]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AgCellRenderer);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
