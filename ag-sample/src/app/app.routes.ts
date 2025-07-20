import { Routes } from '@angular/router';
import { AgSum } from './component/ag-sum/ag-sum';
import { AgTree } from './component/ag-tree/ag-tree';
import { AgFilter } from './component/ag-filter/ag-filter';
import { AgFilterSample } from './component/ag-filter-sample/ag-filter-sample';
import { AgCellEditorSample } from './component/ag-cell-editor-sample/ag-cell-editor-sample';

export const routes: Routes = [
  { path: '', component: AgCellEditorSample }
];
