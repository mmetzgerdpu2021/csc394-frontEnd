import {Component, OnInit, Input, Output, EventEmitter} from '@angular/core';
import {DataTableSourceRow} from './utils/data-source/data-table-source-row';
import {Configuration} from './utils/data-set/configuration';



@Component({
  selector: 'app-data-table',
  templateUrl: './data-table.component.html',
  styleUrls: ['./data-table.component.css']
})
export class DataTableComponent implements OnInit {

  @Input("config") dataTableConfig: Configuration = null;
  @Input("source") dataSource: Array<DataTableSourceRow> = [];
  @Output() onClickDataRowEventEmitter: EventEmitter<DataTableSourceRow> = new EventEmitter();

  constructor() { }

  ngOnInit() {

  }

  clickedColumn(dataRow: DataTableSourceRow) {
    this.onClickDataRowEventEmitter.emit(dataRow);
  }

}

