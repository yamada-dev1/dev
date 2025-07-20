import { Component } from "@angular/core";
import { AgGridAngular } from "ag-grid-angular";
import { ColDef, GridApi, GridOptions, GridReadyEvent } from "ag-grid-community";

@Component({
  selector: 'app-ag-sum',
  imports: [AgGridAngular],
  templateUrl: './ag-sum.html',
  styleUrl: './ag-sum.scss'
})
export class AgSum {
  rowData: any[] = [];
  columnDefs: ColDef[] = [
    { field: 'product', headerName: '商品名' },
    { field: 'price', headerName: '価格', type: 'numericColumn' },
    { field: 'quantity', headerName: '数量', type: 'numericColumn' }
  ];
  gridOptions: GridOptions = {
    defaultColDef: {
      resizable: true,
      sortable: true,
      filter: true
    }
  };
  pinnedTopRowData: any[] = [];
  private gridApi!: GridApi;

  onGridReady(params: GridReadyEvent) {
    this.gridApi = params.api;

    // APIからデータ取得（例として静的データを代用）
    this.rowData = [
      { product: 'りんご', price: 120, quantity: 10 },
      { product: 'バナナ', price: 80, quantity: 20 },
      { product: 'オレンジ', price: 100, quantity: 15 },
      { product: 'りんご', price: 120, quantity: 5 },
    ];

    // 初回統計行の計算
    setTimeout(() => this.updatePinnedRow(), 0);
  }

  updatePinnedRow() {
    const sumRow: any = { product: '合計' };
    const avgRow: any = { product: '平均' };
    const minRow: any = { product: '最小' };
    const maxRow: any = { product: '最大' };
    const countRow: any = { product: '件数' };
    const distinctRow: any = { product: '異なる件数' };
    const distinctSets: Record<string, Set<any>> = {};

    this.gridApi.forEachNodeAfterFilterAndSort(node => {
      const data = node.data;
      if (!data) return;

      Object.keys(data).forEach(field => {
        const val = data[field];
        if (typeof val === 'number') {
          if (sumRow[field] == null) {
            sumRow[field] = 0;
            minRow[field] = val;
            maxRow[field] = val;
            countRow[field] = 0;
            distinctSets[field] = new Set();
          }
          sumRow[field] += val;
          minRow[field] = Math.min(minRow[field], val);
          maxRow[field] = Math.max(maxRow[field], val);
          countRow[field]++;
          distinctSets[field].add(val);
        }
      });
    });

    Object.keys(sumRow).forEach(field => {
      if (field === 'product') return;
      const cnt = countRow[field] || 1;
      avgRow[field] = +(sumRow[field] / cnt).toFixed(2);
      distinctRow[field] = distinctSets[field].size;
    });

    this.pinnedTopRowData = [sumRow, avgRow, minRow, maxRow, countRow, distinctRow];
  }
}
