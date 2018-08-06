import {
  ITableColDefOption
} from './table-col.option';

export interface ITableCalcOption {
  col: string;
}

export type ColSortType = 'asc' | 'desc' | undefined;
export interface ITableSortOption {
  [col: string]: ColSortType;
}

export interface ITableSelectOption {
  disabled?: boolean;
  hidden?: boolean;
  multiple?: boolean;
  col?: string;
  header?: string;
}
export class TableSelectOption implements ITableSelectOption {
  disabled: boolean;
  hidden: boolean;
  multiple: boolean;
  col: string;
  header: string;

  constructor({
    disabled = true,
    hidden = false,
    multiple = false,

    col = '_checked',
    header = '选择',
  }: ITableSelectOption = {}) {
    this.disabled = disabled;
    this.hidden = hidden;
    this.multiple = multiple;
    this.col = col;
    this.header = header;
  }
}

export interface ITableOption {
  colDef: ITableColDefOption[];
  calc?: ITableCalcOption[];
  sort?: ITableSortOption;
  select?: ITableSelectOption;
}

export class TableOption implements ITableOption {
  colDef: ITableColDefOption[];
  calc: ITableCalcOption[];
  sort: ITableSortOption;
  select?: ITableSelectOption;

  constructor ({
    colDef,
    calc = [],
    sort = {},
    select = new TableSelectOption(),
  }: ITableOption) {
    this.colDef = colDef;
    this.calc = calc;
    this.sort = sort;
    this.select = select;
  }
}
