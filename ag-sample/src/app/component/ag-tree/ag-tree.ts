import { Component } from '@angular/core';
import { AgGridAngular } from 'ag-grid-angular';
import { ColDef, GridOptions, ICellRendererParams, RowSelectionOptions } from 'ag-grid-community';

@Component({
  selector: 'app-ag-tree',
  imports: [AgGridAngular],
  templateUrl: './ag-tree.html',
  styleUrl: './ag-tree.scss'
})
export class AgTree {
  rowData: any[] = [];
  columnDefs: ColDef[] = [];

  gridOptions: GridOptions = {
    defaultColDef: {
      resizable: true,
      sortable: true,
      filter: true
    },
    onGridReady: () => {
      this.rowData = this.flattenTree(this.treeData);
    },
    rowSelection: {
      mode: "singleRow"
    } as RowSelectionOptions
  };

  treeData = [
    {
      id: 1,
      name: 'Header A',
      value: '',
      level: 0,
      expanded: false,
      children: [
        {
          id: 2,
          name: 'Sub A1',
          value: '100',
          level: 1
        },
        {
          id: 3,
          name: 'Sub A2',
          value: '200',
          level: 1,
          expanded: false,
          children: [
            {
              id: 4,
              name: 'Detail A2-1',
              value: '250',
              level: 2
            }
          ]
        }
      ]
    },
    {
      id: 5,
      name: 'Header B',
      value: '',
      level: 0
    }
  ];

  ngOnInit(): void {
    this.columnDefs = [
      {
        headerName: 'Name',
        field: 'name',
        cellRenderer: (params: ICellRendererParams) => {
          const data = params.data;
          const indent = (data.level || 0) * 20;
          const icon = data.children ? (data.expanded ? '▼' : '▶') : '•';
          const span = document.createElement('span');
          span.innerHTML = `${icon} ${data.name}`;
          span.style.paddingLeft = `${indent}px`;
          span.style.cursor = 'pointer';
          span.onclick = () => {
            data.expanded = !data.expanded;
            this.rowData = this.flattenTree(this.treeData);
          };
          return span;
        }
      },
      { field: 'value' }
    ];
  }

  flattenTree(data: any[], parentExpanded = true): any[] {
    let result: any[] = [];
    for (let item of data) {
      if (!parentExpanded) continue;
      result.push(item);
      if (item.expanded && item.children) {
        result = result.concat(this.flattenTree(item.children, item.expanded));
      }
    }
    return result;
  }
}
