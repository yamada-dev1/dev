import { Component, OnDestroy, OnInit } from '@angular/core';
import { IFilterAngularComp } from 'ag-grid-angular';
import { IDoesFilterPassParams, IFilterParams, IRowNode, RowNode } from 'ag-grid-community';

@Component({
  selector: 'app-ag-filter',
  imports: [],
  templateUrl: './ag-filter.html',
  styleUrl: './ag-filter.scss'
})
export class AgFilter {
  private params!: IFilterParams;
  private field?: string;

  allValues: string[] = [];
  filteredValues: string[] = [];
  selectedValues = new Set<string>();

  filterText = '';
  allSelected = true;

  private onFilterChangedCallback!: () => void;

  ngOnInit(): void {}
  ngOnDestroy(): void {}

  agInit(params: IFilterParams): void {
    this.params = params;
    this.field = params.colDef.field;

    this.extractUniqueValues();

    this.selectedValues = new Set(this.allValues);
    this.filteredValues = [...this.allValues];
    this.allSelected = true;

    this.onFilterChangedCallback = () => {
      params.filterChangedCallback?.();
    };
  }

  doesFilterPass(params: IDoesFilterPassParams): boolean {
    if (this.selectedValues.size === 0) return false;

    const value = this.field ? params.node.data?.[this.field] : null;
    return value != null && this.selectedValues.has(value.toString());
  }

  isFilterActive(): boolean {
    return (
      this.selectedValues.size > 0 &&
      this.selectedValues.size !== this.allValues.length
    );
  }

  getModel(): any {
    return { values: Array.from(this.selectedValues) };
  }

  setModel(model: any): void {
    this.selectedValues = model?.values
      ? new Set<string>(model.values)
      : new Set(this.allValues);
    this.onFilterChangedCallback();
  }

  private extractUniqueValues(): void {
    const unique = new Set<string>();
    this.params.api.forEachNode((node: IRowNode) => {
      const v = this.field ? node.data?.[this.field] : null;
      if (v != null) unique.add(v.toString());
    });
    this.allValues = Array.from(unique).sort();
  }

  isValueSelected(val: string): boolean {
    return this.selectedValues.has(val);
  }

  onValueToggled(val: string, checked: boolean): void {
    if (checked) this.selectedValues.add(val);
    else this.selectedValues.delete(val);
    this.updateAllSelectedFlag();
    this.onFilterChangedCallback();
  }

  toggleAll(checked: boolean): void {
    this.selectedValues = checked
      ? new Set(this.filteredValues)
      : new Set();
    this.allSelected = checked;
    this.onFilterChangedCallback();
  }

  private updateAllSelectedFlag(): void {
    this.allSelected = this.filteredValues.every((v) =>
      this.selectedValues.has(v)
    );
  }

  /** value は string | undefined になります */
  onFilterTextChanged(value: string | undefined): void {
    this.filterText = value ?? '';
    const txt = this.filterText.toLowerCase();
    this.filteredValues = txt
      ? this.allValues.filter((v) => v.toLowerCase().includes(txt))
      : [...this.allValues];
    this.updateAllSelectedFlag();
  }
}
