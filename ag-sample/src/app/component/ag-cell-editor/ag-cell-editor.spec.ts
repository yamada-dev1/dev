import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AgCellEditor } from './ag-cell-editor';

describe('AgCellEditor', () => {
  let component: AgCellEditor;
  let fixture: ComponentFixture<AgCellEditor>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AgCellEditor]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AgCellEditor);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
