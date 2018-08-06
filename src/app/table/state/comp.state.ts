import {
  CONSTANT
} from '../option';

// ------------------ Table Component State ------------------
export interface ITableState<T> {
  data: T[];
  isLoading: boolean;
}
export class TableState<T> implements ITableState<T> {
  data: T[];
  isLoading: boolean;

  constructor({
    data = [],
    isLoading = false
  } = {}) {
    this.data = data;
    this.isLoading = isLoading;
  }
}
export interface IPaginatorState {
  length: number;
}
export class PaginatorState implements IPaginatorState {
  length: number;

  constructor({
    length = 0
  } = {}) {
    this.length = length;
  }
}
export interface ICompTableState<T> {
  addon: IAddonState;
  table: ITableState<T>;
  paginator: IPaginatorState;
}
export class CompTableState<T> implements ICompTableState<T> {
  addon: IAddonState;
  table: ITableState<T>;
  paginator: IPaginatorState;

  constructor({
    addon = new AddonState(),
    table = new TableState<T>(),
    paginator = new PaginatorState(),
  } = {}) {
    this.addon = addon;
    this.table = table;
    this.paginator = paginator;
  }
}
// ------------------ Table Component State ------------------


// ------------------ Table Component StateChange ------------------
export interface IAddonStateChange {
  date: Date | Date[];
  filters: string[];
}
export class AddonStateChange implements IAddonStateChange {
  date: Date | Date[];
  filters: string[];

  constructor ({
    date = null,
    filters = [],
  } = {}) {
    this.date = date;
    this.filters = filters;
  }
}

export interface ITableStateChange {
  search: string[];
}
export class TableStateChange implements ITableStateChange {
  search: string[];
  constructor({
    search = ['']
  } = {}) {
    this.search = search;
  }
}
export interface IPaginatorStateChange {
  size: number;
  index: number;
}
export class PaginatorStateChange implements IPaginatorStateChange {
  size: number;
  index: number;

  constructor({
    index = CONSTANT.PAGINATOR.INDEX,
    size = CONSTANT.PAGINATOR.SIZE,
  } = {}) {
    this.size = size;
    this.index = index;
  }
}
export interface ICompTableStateChange {
  addon: IAddonStateChange;
  table: ITableStateChange;
  paginator: IPaginatorStateChange;
}
export class CompTableStateChange implements ICompTableStateChange {
  addon: IAddonStateChange;
  table: ITableStateChange;
  paginator: IPaginatorStateChange;

  constructor({
    addon = new AddonStateChange(),
    table = new TableStateChange(),
    paginator = new PaginatorStateChange()
  } = {}) {
    this.addon = addon;
    this.table = table;
    this.paginator = paginator;
  }
}
// ------------------ Table Component StateChange ------------------


// ------------------ Paging State ------------------
export interface ICompPagingState<T> {
  data: T[];
}
export class CompPagingState<T> implements ICompPagingState<T> {
  data: T[];

  constructor({
    data = [],
    searchOption = [],
  } = {}) {
    this.data = data;
  }
}
// ------------------ Paging State ------------------


// ------------------ addon State ------------------
export interface IAddonState {
  date?: Date[];
}

export class AddonState implements IAddonState {
  date: Date[];

  constructor({
    date = [],
  }: IAddonState = {}) {
    this.date = date;
  }
}
// ------------------ addon State ------------------

