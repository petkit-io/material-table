import {
  EditComponent
} from '../../form';
import {
  IEditOption
} from '../../form';
import {
  TableComponent
} from '../table.component';
import {
  TableColDefType
} from './table.type';
import {
  ICompTableOption,
} from './comp.option';
import {
  TableColDefOption,
  ITableColDefOptionArgs,
  ITableColDefOption,
} from './table-col.option';
import {
  TableBtnOptColDefOption
} from './table-col-opt.option';

export class TableEditColDefOption extends TableColDefOption {
  type = TableColDefType.EDIT;
  editOption:  IEditOption;
  valueChange: (arg?: ITableEditColDefValueChangeArg) => any;
  formValueChange: (arg?: ITableEditColDefValueChangeArg) => any;

  constructor ({
    col,
    header,
    hidden = false,
    mapText = (text: string, row: any) => text,
    onClick = null,

    editOption,
    valueChange,
    formValueChange,
  }: ITableEditColDefOptionArg) {
    super({
      col,
      header,
      hidden,
      mapText,
      onClick,
    });
    this.editOption      = editOption;
    this.valueChange     = valueChange;
    this.formValueChange = formValueChange;
  }
}

export interface ITableEditColDefValueChangeArg {
  edit?: EditComponent;
  row?: any;
  col?: ITableColDefOption;
  table?: TableComponent;
  event?: Event;
}

export interface ITableEditColDefOptionArg extends ITableColDefOptionArgs {
  editOption: IEditOption;
  valueChange?: (arg?: ITableEditColDefValueChangeArg) => any;
  formValueChange?: (arg?: ITableEditColDefValueChangeArg) => any;
}

