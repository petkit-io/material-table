import {
  IAddonOption,
  AddonOption
} from './addon.option';
import {
  ITableOption
} from './table.option';
import {
  IPaginatorOption,
  PaginatorOption
} from './paginator.option';

export interface ICompTableOption {
  addon: IAddonOption;
  table: ITableOption;
  paginator: IPaginatorOption;
}

export class CompTableOption implements ICompTableOption {
  addon: IAddonOption;
  table: ITableOption;
  paginator: IPaginatorOption;

  constructor({
    addon = new AddonOption(),
    table,
    paginator = new PaginatorOption(),
  }) {
    this.addon = addon;
    this.table = table;
    this.paginator = paginator;
  }
}
