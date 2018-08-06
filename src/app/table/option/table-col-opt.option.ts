import {
  IButtonOption
} from '../../button';
import {
  ColorType
} from '../../style/type/color.type';
import {
  TableComponent
} from '../table.component';
import {
  ICompTableOption
} from './comp.option';
import {
  TableColDefOption
} from './table-col.option';
import {
  TableColDefType,
  CONSTANT,
} from './table.type';
import {
  ICompTableStateChange,
} from '../state/comp.state';


export class TableOptColDefOption extends TableColDefOption {
  type = TableColDefType.OPT;
  menus: ITableOptColMenuOption[];

  constructor({
    col = CONSTANT.TABLE.COL.OPT_DEF,
    header,
    menus,
    hidden = false,
  }) {
    super({
      col,
      header,
      hidden,
    });
    this.menus = menus;
  }
}

export class TableBtnOptColDefOption extends TableColDefOption {
  type = TableColDefType.BTN_OPT;
  menus: ITableBtnOptColMenuOption[];

  constructor({
    header,
    menus,
    hidden = false,
    col = CONSTANT.TABLE.COL.BTN_OPT_DEF,
  }) {
    super({
      col,
      header,
      hidden,
    });
    this.menus = menus;
  }
}
export interface ITableOptColMenuOption {
  icon: string;
  text: string;
  disabled: boolean;
  hidden: any;
  onClick: (row: any, table: TableComponent) => void;
}
export class TableOptColMenuOption implements ITableOptColMenuOption {
  icon: string;
  text: string;
  disabled: boolean;
  hidden: any;
  onClick: (row: any, table: TableComponent) => void;

  constructor({
    icon,
    text,
    onClick,
    disabled = false,
    hidden = false,
  }) {
    this.icon     = icon;
    this.text     = text;
    this.disabled = disabled;
    this.hidden   = hidden;
    this.onClick  = onClick;
  }
}
export interface ITableBtnOptColMenuOption extends IButtonOption {
  onClick: (arg: ITableBtnOptColMenuOptionClickArg) => any;

  hidden: any;
}
export interface ITableBtnOptColMenuOptionArg {
  text: string;
  onClick: (arg: ITableBtnOptColMenuOptionClickArg) => any;

  icon?: string;
  color?: ColorType;
  disabled?: boolean;
  disableRipple?: boolean;
  hidden?: any;
  classNames?: string | string[];
}
export interface ITableBtnOptColMenuOptionClickArg {
  btn?: any;
  cell?: any;
  row?: any;
  col?: TableBtnOptColDefOption;
  table?: ICompTableOption;
  stateChange?: ICompTableStateChange;
}
export class TableBtnOptColMenuOption implements ITableBtnOptColMenuOption {
  text: string;
  onClick: (arg: ITableBtnOptColMenuOptionClickArg) => any;

  className: string;
  color: ColorType;
  disabled: boolean;
  disableRipple: boolean;

  hidden: any;
  icon: string;

  constructor({
    text,
    onClick,
    icon,
    color,
    classNames,
    disabled = false,
    disableRipple = false,
    hidden = false,
  }: ITableBtnOptColMenuOptionArg) {
    this.text = text;
    this.onClick = onClick;
    this.icon = icon;
    this.color = color;
    this.disabled = disabled;
    this.disableRipple = disableRipple;
    this.hidden = hidden;
    if (typeof classNames === 'object') {
      this.className = classNames.join(' ');
    } else {
      this.className = classNames;
    }
  }
}
