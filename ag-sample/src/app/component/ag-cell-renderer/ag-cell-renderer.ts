import { Component, Output, EventEmitter } from '@angular/core';
import { ICellRendererAngularComp } from 'ag-grid-angular';

@Component({
  selector: 'app-ag-cell-renderer',
  templateUrl: './ag-cell-renderer.html',
  styleUrls: ['./ag-cell-renderer.scss']
})
export class AgCellRenderer implements ICellRendererAngularComp {
  params: any;

  @Output() cellAction = new EventEmitter<{ action: string, params: any }>();

  agInit(params: any): void {
    this.params = params;
  }

  refresh(): boolean {
    return false;
  }

  onClick(event: MouseEvent) {
    // クリック位置の判定（例：クリックした要素のclass名など）
    const target = event.target as HTMLElement;

    if (target.classList.contains('edit-icon')) {
      this.params.context?.onCellRendererAction?.({ action: 'iconClick', params: this.params });
    } else {
      this.params.context?.onCellRendererAction?.({ action: 'cellClick', params: this.params });
    }
  }
}
