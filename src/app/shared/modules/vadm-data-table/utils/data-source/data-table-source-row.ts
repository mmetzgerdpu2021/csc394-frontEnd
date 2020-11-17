/**
 * Created by zmorhir on 24/03/2020.
 */


export class DataTableSourceRow {
  private dataRow: Map<string, any> = new Map();

  constructor(cells: Map<string, any>) {
    this.dataRow = cells;
  }

  cell(code: string): string {
    return this.dataRow.get(code);
  }
}
