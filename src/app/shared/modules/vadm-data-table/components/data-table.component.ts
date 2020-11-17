
import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import {DataTableActionItem, DataTableConfiguration} from '../models/data-table.model';


@Component({
  selector: 'app-data-table',
  templateUrl: './data-table.component.html',
  styleUrls: []
})
export class DataTableComponent implements OnInit {

  @Input("config") dataTableConfig: DataTableConfiguration = null;
  @Input("source") dataSource: Array<DataTableSourceRow> = [];

  @Output("action") actionEventEmitter: EventEmitter<DataTableAction> = new EventEmitter();

  constructor() { }

  ngOnInit() {

  }

  onAction(row: DataTableSourceRow, action: DataTableActionItem) {
    this.actionEventEmitter.emit(new DataTableAction(row, action));
  }
}


export class DataTableSourceRow {
  private dataRow: Map<string, any> = new Map();

  constructor(cells: Map<string, any>) {
    this.dataRow = cells;
  }

  cell(code: string): string {
    return this.dataRow.get(code);
  }
}

export class DataTableAction {
  constructor(
    public row: DataTableSourceRow,
    public action: DataTableActionItem) {

  }

}
