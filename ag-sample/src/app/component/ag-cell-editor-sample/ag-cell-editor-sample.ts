import { Component, ElementRef, inject } from '@angular/core';
import { CellClickedEvent, ColDef, GridApi, GridOptions } from 'ag-grid-community';
import { AgCellRenderer } from '../ag-cell-renderer/ag-cell-renderer';
import { AgCellEditor } from '../ag-cell-editor/ag-cell-editor';
import { AgGridAngular } from 'ag-grid-angular';

@Component({
  selector: 'app-ag-cell-editor-sample',
  imports: [AgGridAngular],
  templateUrl: './ag-cell-editor-sample.html',
  styleUrls: ['./ag-cell-editor-sample.scss']
})
export class AgCellEditorSample {
  private elementRef = inject(ElementRef);

  gridApi!: GridApi;

  columnDefs: ColDef[] = [
    {
      headerName: '名前',
      field: 'name',
      editable: true,
      cellRenderer: AgCellRenderer,
      cellEditor: AgCellEditor
    },
    {
      headerName: '年齢',
      field: 'age'
    }
  ];

  rowData = [
    { name: '太郎', age: 30 },
    { name: '花子', age: 25 }
  ];

  defaultColDef: ColDef = {
    flex: 1,
    resizable: true
  };

  gridOptions: GridOptions = {
    context: {
      onCellRendererAction: (event: { action: string; params: any }) =>
        this.onCellRendererAction(event)
    }
  };

  ngOnInit() {
    document.addEventListener('click', this.onDocumentClick, true);
  }

  ngOnDestroy() {
    document.removeEventListener('click', this.onDocumentClick, true);
  }

  onGridReady(params: any): void {
    this.gridApi = params.api;
  }

  // レンダラーからのイベント受信
  onCellRendererAction(event: { action: string; params: any }) {
    const { action, params } = event;

    const rowIndex = params.node?.rowIndex ?? null;

    if (rowIndex === null) {
      console.warn('Row index not found in renderer event');
      return;
    }

    this.gridApi.startEditingCell({
      rowIndex: rowIndex,
      colKey: params.column.getId()
    });

    if (action === 'iconClick') {
      // 追加のアイコンクリック処理
      console.log('アイコンがクリックされました:', rowIndex);
    }
  }

  onDocumentClick = (event: MouseEvent) => {
    const target = event.target as HTMLElement;

    const editingCells = this.gridApi.getEditingCells();
    if (editingCells.length === 0) return;

    const { rowIndex, colId } = editingCells[0];

    const editingRowEl = document.querySelector(`div[role="row"][row-index="${rowIndex}"]`);
    const editingCellEl = editingRowEl?.querySelector(`.ag-cell[col-id="${colId}"]`);

    // 編集セル内クリックかポップアップ内クリックなら編集終了しない
    if (editingCellEl?.contains(target) || target.closest('.popup')) {
      return;
    }

    // それ以外は編集終了
    this.gridApi.stopEditing();
  };

  startEditTopLeftCell(): void {
    if (!this.gridApi) return;

    // 編集可能な左端の列を探す
    const editableCol = this.columnDefs.find(col => col.editable);

    if (editableCol) {
      this.gridApi.startEditingCell({
        rowIndex: 0,
        colKey: editableCol.field || editableCol.colId || '',
        // rowPinned も必要なら指定（通常は不要）
      });
    }
  }

}
