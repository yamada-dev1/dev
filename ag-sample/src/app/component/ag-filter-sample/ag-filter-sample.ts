import { Component } from '@angular/core';
import { AgFilter } from '../ag-filter/ag-filter';
import { AgGridAngular } from 'ag-grid-angular';
import { ColDef } from 'ag-grid-community';

@Component({
  selector: 'app-ag-filter-sample',
  imports: [AgGridAngular],
  templateUrl: './ag-filter-sample.html',
  styleUrl: './ag-filter-sample.scss'
})
export class AgFilterSample {
  components = {
    agCustomFilter: AgFilter
  };

  // グリッドに表示するサンプルデータ
  rowData = [
    { name: 'Alice', country: 'Japan', age: 24 },
    { name: 'Bob', country: 'USA', age: 30 },
    { name: 'Carol', country: 'Canada', age: 27 },
    { name: 'Dave', country: 'Japan', age: 22 },
    { name: 'Eve', country: 'Germany', age: 29 },
  ];

  // カラム定義：country 列にだけ AgFilter を適用
  columnDefs: ColDef[] = [
    { field: 'name', headerName: 'Name', sortable: true },
    {
      field: 'country',
      headerName: 'Country',
      filter: 'agCustomFilter',
      sortable: true,
      flex: 1,
    },
    { field: 'age', headerName: 'Age', sortable: true, filter: 'agNumberColumnFilter' },
  ];

  // グリッドオプション
  defaultColDef = {
    resizable: true,
    minWidth: 100,
  };
}
