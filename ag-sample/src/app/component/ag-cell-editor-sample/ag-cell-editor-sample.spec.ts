import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AgCellEditorSample } from './ag-cell-editor-sample';

describe('AgCellEditorSample', () => {
  let component: AgCellEditorSample;
  let fixture: ComponentFixture<AgCellEditorSample>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AgCellEditorSample]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AgCellEditorSample);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
