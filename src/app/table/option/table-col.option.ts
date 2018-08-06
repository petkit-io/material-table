import {
  TableComponent
} from '../table.component';
import {
  TableColDefType
} from './table.type';

export interface ITableColDefOption {
  type:    TableColDefType;

  col:     string;
  header:  string;
  hidden:  boolean;

  sortable: boolean;

  mapText: (text: string, row: any) => string;
  onClick: (row: any, table: TableComponent) => void;
}

export interface ITableColDefOptionArgs {
  col:     string;
  header:  string;
  hidden?: boolean;

  sortable?: boolean;

  mapText?: (text: string, row: any) => string;
  onClick?: (row: any, table: TableComponent) => void;
}

export class TableColDefOption implements ITableColDefOption {
  type = TableColDefType.DEFAULT;

  col: string;
  header: string;
  hidden: boolean;

  sortable: boolean;

  mapText: (text: string, row: any) => string;
  onClick: (row: any, table: TableComponent) => void;

  constructor ({
    col,
    header,
    hidden = false,

    sortable = true,

    mapText = (text: string, row: any) => text,
    onClick = null,
  }: ITableColDefOptionArgs) {
    this.col     = col;
    this.header  = header;
    this.hidden  = hidden;

    this.sortable = sortable;

    this.mapText = mapText;
    this.onClick = onClick;
  }

  canClick(): boolean {
    return !!this.onClick;
  }
}

