import { Component, ElementRef, ViewChild } from '@angular/core';
import { ICellEditorAngularComp } from 'ag-grid-angular';

@Component({
  selector: 'app-ag-cell-editor',
  templateUrl: './ag-cell-editor.html',
  styleUrls: ['./ag-cell-editor.scss']
})
export class AgCellEditor implements ICellEditorAngularComp {
  value: string = '';
  private params: any;

  @ViewChild('inputRef') inputRef!: ElementRef<HTMLInputElement>;

  // 初期化：セルの編集が始まる際に呼ばれる
  agInit(params: any): void {
    this.params = params;
    this.value = params.value;
  }

  // 編集完了時に呼ばれ、値を返す
  getValue(): any {
    return this.value;
  }

  // 編集UIが表示された後に呼ばれる（フォーカス当て等に使う）
  afterGuiAttached(): void {
    setTimeout(() => {
      this.inputRef?.nativeElement?.focus();
      this.inputRef?.nativeElement?.select();
    });
  }

  // 入力変更イベントで値を更新
  onInput(event: Event) {
    const target = event.target as HTMLInputElement;
    this.value = target.value;
  }

  onKeyDown(event: KeyboardEvent) {
    if (event.key === 'Escape') {
      event.preventDefault();
    }
  }

}
